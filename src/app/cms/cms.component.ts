import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PoliticiansService } from './politicians.service';
import { Politician } from './politician';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.css']
})
export class CmsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'image', 'description', 'votes', 'corrupt', 'not_corrupt', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();

  selectedPolitician: Politician = new Politician();
  loading = false;

  constructor(public politicianService: PoliticiansService) {

  }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.politicianService.getPoliticians();
    this.dataSource.data = data;
    this.loading = false;
  }

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
    if (confirm(`Are you sure you want to delete the politician ${politician.name}. This cannot be undone.`)) {
      await this.politicianService.deletePolitician(politician.id!);
    }
    await this.refresh();
  }

}
