import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { E404Component } from "./e404/e404.component";
import { AuthGuard } from "./login/auth.guard";
import { LoginComponent } from "./login/login.component";
import { MainGuard } from "./login/main.guard";
import { MainPageComponent } from "./main-page/home.component";
import { OperationsPageComponent } from "./operations-page/operations-page.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "home",
    component: MainPageComponent,
    canActivate: [AuthGuard],
    // resolve: [ClientResolverService],
  },
  {
    path: "operations",
    component: OperationsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "login-page", component: LoginComponent, canActivate: [MainGuard] },
  { path: "admin", component: AdminComponent },
  { path: "404", component: E404Component },
  {path: '**', redirectTo: '/404'}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
