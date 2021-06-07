import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";
import { LoginPage } from "./login/login";
import { AccountPage } from "./account/account";
import { SignupPage } from "./signup/signup";
import { SupportPage } from "./support/support";
import { HttpClientModule } from "@angular/common/http";
import { ShareModule } from "../ShareModule/share.module";

const routes: Routes = [
  {
    path: "",
    pathMatch: "prefix",
    redirectTo: "account",
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
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [AccountPage, SupportPage, LoginPage, SignupPage],
  providers: [],
})
export class PublicModule {}
