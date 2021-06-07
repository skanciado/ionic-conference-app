import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";

import { AlertController } from "@ionic/angular";

@Component({
  selector: "page-account",
  templateUrl: "account.html",
  styleUrls: ["./account.scss"],
})
export class AccountPage implements AfterViewInit {
  username: string = "test";

  constructor(public alertCtrl: AlertController, public router: Router) {
    console.log("Entra en AccountPage");
  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log("Clicked to update picture");
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const alert = await this.alertCtrl.create({
      header: "Change Username",
      buttons: [
        "Cancel",
        {
          text: "Ok",
          handler: (data: any) => {
            this.getUsername();
          },
        },
      ],
      inputs: [
        {
          type: "text",
          name: "username",
          value: this.username,
          placeholder: "username",
        },
      ],
    });
    await alert.present();
  }

  getUsername() {
    return "name";
  }

  changePassword() {
    console.log("Clicked to change password");
  }

  logout() {
    this.router.navigateByUrl("/login");
  }

  support() {
    this.router.navigateByUrl("/support");
  }
}
