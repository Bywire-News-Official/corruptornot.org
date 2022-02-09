import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AfterViewInit, ViewChild } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatSortable } from "@angular/material/sort";
import { PoliticiansService } from "../services/politicians.service";
import { Result } from "../interfaces/Result";
import { Politician } from "../models/politician";
import { MatPaginator } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import * as _ from "lodash";
import { environment } from '../../environments/environment';

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.css"],
})
export class ResultComponent implements OnInit {
  displayedColumns = ["id", "name", "vote", "score", "corrupt"];
  dataSource = new MatTableDataSource<Result>();
  resultData: Result[] = [];
  loading = false;
  sortOrder = "desc";
  heading = "Most";

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | any;

  constructor(
    public politicianService: PoliticiansService,
    private router: Router
  ) {
    if (this.router.url === "/the-least") {
      this.sortOrder = "asc";
      this.heading = "Least";
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadResult();
  }
  async loadResult() {
    this.loading = true;
    // load result and groud them by user
    const results = await this.politicianService.getResults();
    const groupResult = _.groupBy(results, (result) => result.politician.id);
    for (let [index, elem] of Object.keys(groupResult).entries()) {
      const result = groupResult[elem];
      const id = result[0].politician.id;
      const name = result[0].politician.name;
      const image = result[0].politician.image;
      const totalResult = result.length;
      if (totalResult > 0) {
        // calculate the precent of every politician
        const totalCorruptResult = result.filter(
          (elem: any) => elem.isCorrupt == true
        ).length;
        const totalNotCorruptResult = totalResult - totalCorruptResult;
        const scoreCorrupt = (totalCorruptResult / totalResult) * 100;
        const scoreNotCorrupt = Math.abs(scoreCorrupt - 100);
        let selectedCorrupt = scoreNotCorrupt;
        let isCorrupt = "Yes";
        if (scoreCorrupt < environment.corruptThreshold) {
          isCorrupt = "No";
        }
        if (this.router.url === "/the-least") {
          selectedCorrupt = scoreCorrupt;
        }
        this.resultData.push({
          id: id,
          name: name,
          vote: totalResult,
          score: scoreCorrupt,
          corrupt: isCorrupt,
          image: image,
        });
      }
    }
    this.dataSource.data = this.resultData;
    this.dataSource.paginator = this.paginator;
    this.sort.sort({ id: "score", start: this.sortOrder } as MatSortable);
    this.loading = false;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(eventK: KeyboardEvent) {
    // filter result table while typing
    let filterValue = (<HTMLInputElement>eventK.target).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
