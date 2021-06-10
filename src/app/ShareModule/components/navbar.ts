import { AfterViewInit, Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { AlertController } from "@ionic/angular";
import { IUser } from "../../entities/Interfaces";
import { EventService } from "../../providers/event.service";

@Component({
  selector: "navbar-comp",
  templateUrl: "navbar.html",
  styleUrls: ["./navbar.scss"],
})
export class NavbarCompoment {
  @Input("darkMode")
  public darkMode: boolean;
  @Input("user")
  public user: IUser;
  public nativeNavbar: boolean;

  constructor(
    public alertCtrl: AlertController,
    public eventService: EventService,
    public router: Router
  ) {
    this.darkMode = false;
    this.nativeNavbar = false;
  }
  public darkModeOn() {
    this.darkMode = true;
    this.eventService.sendDarkMode(true);
  }
  public darkModeOff() {
    this.darkMode = false;
    this.eventService.sendDarkMode(false);
  }
}
