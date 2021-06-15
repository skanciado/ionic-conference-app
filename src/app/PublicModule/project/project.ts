import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";

import { AlertController } from "@ionic/angular";

@Component({
  selector: "page-project",
  templateUrl: "project.html",
  styleUrls: ["./project.scss"],
})
export class ProjectPage {
  constructor(public alertCtrl: AlertController, public router: Router) {
    console.log("Entra en ProyectoPage");
  }
}
