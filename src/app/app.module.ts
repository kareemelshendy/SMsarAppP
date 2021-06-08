import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { SearchfilterPipe } from "./main-page/searchfilter.pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {ConnectionServiceModule} from 'ng-connection-service';
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { MainPageComponent } from "./main-page/home.component";
import { OperationsPageComponent } from "./operations-page/operations-page.component";
import { HeaderComponent } from "./header/header.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdminComponent } from "./admin/admin.component";
import { EditComponent } from "./admin/edit/edit.component";
import { HomeEditComponent } from "./main-page/home-edit/home-edit.component";
import { HomeDetailComponent } from "./main-page/home-detail/home-detail.component";
import { OperationDetailComponent } from "./operations-page/operation-detail/operation-detail.component";
import { OperationEditComponent } from "./operations-page/operation-edit/operation-edit.component";
import { AuthInterceptorService } from "./login/auth-interceptor.service";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { DetailsComponent } from './admin/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from "@angular/material";
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { E404Component } from './e404/e404.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    OperationsPageComponent,
    HeaderComponent,
    DashboardComponent,
    AdminComponent,
    EditComponent,
    HomeEditComponent,
    SearchfilterPipe,
    HomeDetailComponent,
    OperationDetailComponent,
    OperationEditComponent,
    LoadingSpinnerComponent,
    DetailsComponent,
    MainNavComponent,
    E404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ConnectionServiceModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    {

      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    // {provide: ConnectionServiceOptionsToken,
    //   useValue: <ConnectionServiceOptions>{
    //     enableHeartbeat: false,
    //     heartbeatUrl: '/assets/ping.json',
    //     requestMethod: 'get',
    //     heartbeatInterval: 3000
    //   }
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
