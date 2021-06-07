import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserOptions } from "../../interfaces/user-options";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
  styleUrls: ["./login.scss"],
})
export class LoginPage {
  login: UserOptions = { username: "", password: "" };
  submitted = false;

  constructor(public router: Router) {
    console.log("Entra en Login");
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.router.navigateByUrl("/app/tabs/schedule");
    }
  }

  onSignup() {
    this.router.navigateByUrl("/signup");
  }
}
