import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";

import { AlertController } from "@ionic/angular";

@Component({
  selector: "page-schedule",
  templateUrl: "schedule.html",
  styleUrls: ["./schedule.scss"],
})
export class SchedulePage {
  constructor(public alertCtrl: AlertController, public router: Router) {
    console.log("Entra en schedule");
  }
}
