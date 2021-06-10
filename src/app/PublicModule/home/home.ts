import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";

import { AlertController } from "@ionic/angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  styleUrls: ["./home.scss"],
})
export class HomePage {
  constructor(public alertCtrl: AlertController, public router: Router) {
    console.log("Entra en HomePage");
  }
}
