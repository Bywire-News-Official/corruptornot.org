import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//import { NgxChartsModule } from "@swimlane/ngx-charts";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponentComponent } from "../dialog-component/dialog-component.component";
import { ActivatedRoute } from "@angular/router";
import { PoliticiansService } from "../services/politicians.service";
import { UserService } from "../services/user.service";
import { VoteService } from "../services/vote.service";
import { User } from "../models/user";
import { Vote } from "../models/vote";
import { Chart, Point } from 'chart.js';
import * as _ from "lodash";
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { environment } from '../../environments/environment';

@Component({
  selector: "app-politicians",
  templateUrl: "./politicians.component.html",
  styleUrls: ["./politicians.component.css"],
})
export class PoliticiansComponent implements OnInit {
  politician = [
    {
      id: 0,
      name: "",
      image: "",
      description: "",
      corrupt: 0,
      notCorrupt: 0,
      votes: 0,
    },
  ];
  totalPoliticians = this.politician.length;
  politicianIndex = 0;
  currentPolitician = this.politician[this.politicianIndex];
  message = "";
  requiredForm: FormGroup;
  data: any;
  hideBasicInfo = true;
  hideSignInfo = true;
  isLogged = false;
  selectedResult = environment.corruptLabel;
  selectedPercent = 0;
  politicianID: any = null;
  intervalID: any = null;
  STORAGE_KEY = "corrupt-or-not-";
  currentUser: User = new User();
  hasLogged = false;
  hideLoginForm = true;
  hideChartArea = true;
  tempDecision: boolean | any;
  loading = false;


  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = environment.mapLegendPosition;
  chartData = [10, 0];
  pieChartData: ChartData<'pie', number[], string | string[]> | any;
  checkoutForm = this.formBuilder.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
  });
  


  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private voteService: VoteService,
    private politicianService: PoliticiansService
  ) {
    this.requiredForm = this.formBuilder.group({
      name: ["", Validators.required],
    });
    this.loginForm();

  }
  ngOnInit(): void {
    this.checkUser();
    this.refresh();
    //update the result every 5 seconds
    setInterval(() => {
      this.calculateResult();
    }, 5000);/**/
  }
  /*
    Randomly display a new politician on page load, if the url contains the id of aq 
    politician, load it instead.
  */
  async refresh() {
    const data = await this.politicianService.getPoliticians();
    if (this.route.snapshot.queryParamMap.get("id")) {
      this.politicianID = this.route.snapshot.queryParamMap.get("id");
    }
    this.politician = data.sort(() => Math.random() - 0.5);
    this.totalPoliticians = this.politician.length;
    this.politicianIndex = 0;
    if (this.politicianID == null) {
      this.currentPolitician = this.politician[this.politicianIndex];
    } else {
      let obj = this.politician.find(
        (o) => o.id === Number.parseInt(this.politicianID, 10)
      );
      this.currentPolitician = obj!;
    }
  }
  /*
    check if user is logged, update global objects
  */
  async checkUser() {
    if (localStorage.getItem(this.STORAGE_KEY)) {
      let userData = JSON.parse(localStorage.getItem(this.STORAGE_KEY)!);
      if (userData.hasLogged) {
        this.currentUser = await this.userService.getUser(userData.email);
        this.isLogged = this.currentUser == null ? false : true;
      }
    }
  }
  /*
    Check if the user has already voted this politician, otherwise
    save the vote in database.
  
  */
  async saveVote(decision: boolean) {
    let voteForPolitician: Vote = await this.voteService.getVoteForPolitician(
      this.currentUser.id!,
      this.currentPolitician.id!
    );
    if (voteForPolitician == null) {
      let vote = new Vote();
      vote.isCorrupt = decision;
      vote.politician = this.currentPolitician;
      vote.user = this.currentUser;
      await this.voteService.createVote(vote);
    } else {
      // 'User has already  voted '
    }
  }
  /*
    trigger when user clicks on vote buttons
  */
  onVote(decision: boolean) {
    if (this.isLogged) {
      //If user is logged, save the vote and display hidden fields
      this.saveVote(decision);
      this.hideLoginForm = true;
      this.hideChartArea = false;
      this.message =environment.afterVoteMessage(!decision?environment.notCorruptLabel:environment.corruptLabel);
      this.intervalID = setInterval(() => {
        this.onNext();
      }, 10000);
    } else {
      // memorize user decicision and display login form
      this.tempDecision = decision;
      this.hideLoginForm = false;
      this.hideChartArea = true;
      this.message = environment.afterVoteMessage(!decision?environment.notCorruptLabel:environment.corruptLabel);
    }
    this.calculateResult();
  }

  /*
    display next politician in the list
  */
  onNext() {
    clearInterval(this.intervalID);
    if (this.politicianIndex < this.totalPoliticians - 1) {
      this.politicianIndex += 1;
    }
    this.currentPolitician = this.politician[this.politicianIndex];
    this.message = "";
    this.hideChartArea = true;
    this.hideLoginForm = true;
    localStorage.setItem("userSigned", this.isLogged ? "yes" : "no");
  }
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  /*
    calculate vote result for current politician and display it on the chart
  */
  async calculateResult() {
    const result = await this.politicianService.getResult(
      this.currentPolitician.id
    );
    if (result != null) {
      const totalResult = result.length;
      if (totalResult > 0) {
        const totalCorruptResult = result.filter(
          (elem: any) => elem.isCorrupt == true
        ).length;
        const totalNotCorruptResult = totalResult - totalCorruptResult;
        const scoreCorrupt = (totalCorruptResult / totalResult) * 100;
        const scoreNotCorrupt = Math.abs(scoreCorrupt - 100);
        if (scoreCorrupt < environment.corruptThreshold) {
          this.selectedResult = environment.notCorruptLabel;
          this.selectedPercent = scoreNotCorrupt;
        } else {
          this.selectedPercent = scoreCorrupt;
          this.selectedResult = environment.corruptLabel;
        }
        this.chartData = [totalCorruptResult ,totalNotCorruptResult ];
        //this.pieChartData.datasets[0].data = this.chartData;
        this.pieChartData= {
            labels: [  environment.corruptLabel, environment.notCorruptLabel ],
            datasets: [ {
              data: this.chartData
            } ]
          };        
      }
    }
  }

  /* trigger when user submit their email*/
  onSubmit(): void {
    this.loading = true;
    if (!this.f.name.invalid && !this.f.email.invalid) {
      // if submitted form is valid, log in user ans save their vote
      let name = this.checkoutForm.value.name;
      let email = this.checkoutForm.value.email;

      // log in user
      if (localStorage.getItem(this.STORAGE_KEY)) {
        let userData = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "");
        userData.name = name;
        userData.email = email;
        userData.hasLogged = true;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
        userData.hasLogged = true;
        this.isLogged = true;

        // create new user in database
        this.currentUser.name = name;
        this.currentUser.email = email;
        this.currentUser.ip = "";
        this.createUser(this.currentUser);

        //save the vote, wait 3 seconds to take in account the new result
        if (this.tempDecision != null) {
          setTimeout(() => {
            this.saveVote(this.tempDecision);           
            //display result
            this.hideLoginForm = true;
            this.hideChartArea = false;
            this.loading = true;
            // move user to the next politician after 10 seconds
            this.intervalID = setInterval(() => {
              //this.onNext();
            }, 10000);
          }, 3000);
        }

        // scroll user to the result box
        let el = document.getElementById("resultBox");
        this.scroll(el!);
        document.getElementById("resultBox")!.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    } else {
      this.loading = false;
    }
  }

  loginForm() {
    this.requiredForm = this.formBuilder.group({
      name: ["", Validators.required],
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  showDialog() {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: "450px",
      height: "200px",
    });
    setTimeout(() => {
      dialogRef.close();
    }, 10000);
  }
  /*
    create new user if it does not exist
  */
  async createUser(user: User) {
    let er: User = await this.userService.getUser(user.email);
    if (er == null) {
      const res = await this.userService.createUser(user);
      this.currentUser = res;
    } else {
      this.currentUser = er;
    }
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.checkoutForm.controls;
  }
  
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];  
}
