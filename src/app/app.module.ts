import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
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
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { NgChartsModule } from 'ng2-charts';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { LoginComponent } from './login/login.component';
import { MatTableExporterModule } from 'mat-table-exporter';

import { saBackendProvider } from './common/backend-interceptor';
import { ErrorInterceptor } from './common/error-interceptor';
import { AuthChecker } from './common/auth.checker';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ResultComponent,
    PoliticiansComponent,
    CmsComponent,
    DialogComponentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgChartsModule,
    RouterModule.forRoot([
      { path: '', component: PoliticiansComponent },
      { path: 'the-most', component: ResultComponent },
      { path: 'the-least', component: ResultComponent },
      { path: 'admin', component: CmsComponent, canActivate: [AuthChecker]  },
      { path: 'login', component: LoginComponent },
      {path: 'result', component: ResultComponent},
      { path: '**', redirectTo: '' }
    ]),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTableExporterModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        saBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
