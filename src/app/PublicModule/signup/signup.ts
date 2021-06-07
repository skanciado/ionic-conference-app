import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { UserOptions } from "../../interfaces/user-options";

@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
  styleUrls: ["./signup.scss"],
})
export class SignupPage {
  signup: UserOptions = { username: "", password: "" };
  submitted = false;

  constructor(public router: Router) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.router.navigateByUrl("/app/tabs/schedule");
    }
  }
}
