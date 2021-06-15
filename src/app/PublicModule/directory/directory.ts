import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";

import { AlertController } from "@ionic/angular";

@Component({
  selector: "page-directory",
  templateUrl: "directory.html",
  styleUrls: ["./directory.scss"],
})
export class DirectoryPage {
  constructor(public alertCtrl: AlertController, public router: Router) {
    console.log("Entra en DirectoryPage");
  }
}
