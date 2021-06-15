import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";
import { LoginPage } from "./login/login";
import { AccountPage } from "./account/account";

import { HomePage } from "./home/home";
import { SignupPage } from "./signup/signup";
import { SupportPage } from "./support/support";
import { HttpClientModule } from "@angular/common/http";
import { ShareModule } from "../ShareModule/share.module";
import { SchedulePage } from "./schedule/schedule";
import { ProjectPage } from "./project/project";
import { DirectoryPage } from "./directory/directory";

const routes: Routes = [
  {
    path: "public",
    pathMatch: "full",
    redirectTo: "",
  },
  {
    path: "",
    component: HomePage,
  },
  {
    path: "schedure",
    component: SchedulePage,
  },
  {
    path: "project",
    component: ProjectPage,
  },
  {
    path: "directory",
    component: DirectoryPage,
  },
  {
    path: "login",
    component: LoginPage,
  },
  {
    path: "account",
    component: AccountPage,
  },
  {
    path: "signup",
    component: SignupPage,
  },
  {
    path: "support",
    component: SupportPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ShareModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [
    AccountPage,
    HomePage,
    SupportPage,
    LoginPage,
    SignupPage,
    SchedulePage,
    ProjectPage,
    DirectoryPage,
  ],
  providers: [],
})
export class PublicModule {}
