import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { PoliticiansService } from "../services/politicians.service";
import { first } from "rxjs/operators";
import { Admin } from "../models/admin";
import { Politician } from "../models/politician";
import { AdminService } from "../services/admin.service";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import { User } from "../models/user";
import { MatPaginator } from "@angular/material/paginator";
import * as _ from "lodash";
import { environment } from '../../environments/environment';

@Component({
  selector: "app-cms",
  templateUrl: "./cms.component.html",
  styleUrls: ["./cms.component.css"],
})
export class CmsComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "image",
    "description",
    "votes",
    "corrupt",
    "notCorrupt",
    "edit",
    "delete",
  ];
  dataSource = new MatTableDataSource<any>();

  displayedColumnsUser: string[] = ["id", "name", "email", "delete"];
  dataSourceUser = new MatTableDataSource<any>();

  selectedPolitician: Politician = new Politician();
  loading = false;
  currentAdmin: any;
  error = "";

  @ViewChild("firstpaginator", { read: MatPaginator }) paginator:
    | MatPaginator
    | any;
  @ViewChild("paginatorUser", { read: MatPaginator }) paginatorUser:
    | MatPaginator
    | any;

  constructor(
    public politicianService: PoliticiansService,
    private adminService: AdminService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentAdmin.subscribe((admin: any) => {
      this.currentAdmin = admin;
    });
  }

  ngOnInit() {
    this.loading = true;

    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.getTableData(); 
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;

    const dataUser = await this.userService.getUsers();
    this.dataSourceUser.data = dataUser;
    this.dataSourceUser.paginator = this.paginatorUser;

    this.loading = false;
  }

  /*
    if a politician is selected, updated it
    otherwise, create a new one.
  */
  async updatePolitician() {
    if (this.selectedPolitician.id !== undefined) {
      await this.politicianService.updatePolitician(this.selectedPolitician);
    } else {
      await this.politicianService.createPolitician(this.selectedPolitician);
    }
    this.selectedPolitician = new Politician();
    await this.refresh();
  }

  editPolitician(politician: Politician) {
    this.selectedPolitician = politician;
  }

  clearPolitician() {
    this.selectedPolitician = new Politician();
  }

  async deletePolitician(politician: Politician) {
    this.loading = true;
    if (
      confirm(
        environment.deleteMessage(politician.name)
      )
    ) {
      await this.politicianService.deletePolitician(politician.id!);
    }
    await this.refresh();
  }
  async deleteUser(user: User) {
    this.loading = true;
    if (
      confirm(
        environment.deleteMessage(user.name)
      )
    ) {
      await this.userService.deleteUser(user.id!);
    }
    location.reload();
  }
  async updateAdmin() {
    // update admin password
    await this.adminService.updateAdmin(this.currentAdmin);
    await this.authenticationService.logout();
    location.reload(true);
  }
  async createAdmin() {
    // update new admin account
    const checkAdmin = await this.adminService.getAdmin(this.currentAdmin);
    if (checkAdmin == null) {
      // admin does not exist, create it
      await this.adminService.createAdmin(this.currentAdmin);
    } else {
      this.error = environment.adminExistMsg;
    }
  }
  async getTableData() {
    // load politicians and their result
    const politicianData = await this.politicianService.getPoliticians();
    const results = await this.politicianService.getResults();
    // group result by politician id
    const groupResult = _.groupBy(results, (result) => result.politician.id);
    // attach result to the politician data
    for (let politician of politicianData) {
      const politicianID = politician.id;
      if (politicianID in groupResult) {
        const pResult = groupResult[politicianID];
        const totalCorruptResult = pResult.filter(
          (elem: any) => elem.isCorrupt == true
        ).length;
        const totalNotCorruptResult = pResult.length - totalCorruptResult;
        politician.corrupt = totalCorruptResult;
        politician.notCorrupt = totalNotCorruptResult;
        politician.votes = pResult.length;
      }
    }
    return politicianData;
  }
}
