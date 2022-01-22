import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoliciansComponent } from './policians/policians.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ResultMostComponent } from './result-most/result-most.component';
import { ResultLeastComponent } from './result-least/result-least.component';
import { ResultComponent } from './result/result.component';
import { PoliticiansComponent } from './politicians/politicians.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CmsComponent } from './cms/cms.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button'
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PoliciansComponent,
    TopBarComponent,
    ResultMostComponent,
    ResultLeastComponent,
    ResultComponent,
    PoliticiansComponent,
    CmsComponent,
    PieChartComponent,
    DialogComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: PoliticiansComponent },
      { path: 'the-most', component: ResultMostComponent },
      { path: 'the-least', component: ResultLeastComponent },
      { path: 'admin', component: CmsComponent },
    ]),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
    NgChartsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
