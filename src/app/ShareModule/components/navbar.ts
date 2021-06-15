import { AfterViewInit, Component, Input, OnInit, Output } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

import { AlertController, NavController } from "@ionic/angular";
import * as EventEmitter from "events";
import { filter } from "rxjs/operators";
import { IUser } from "../../entities/Interfaces";
import { EventService } from "../../providers/event.service";

@Component({
  selector: "navbar-comp",
  templateUrl: "navbar.html",
  styleUrls: ["./navbar.scss"],
})
export class NavbarCompoment {
  public selected: string;
  @Input("menu")
  set menus(menu: []) {
    this.tabs = menu;
  }
  public tabs: [];

  @Input("darkMode")
  public darkMode: boolean;
  @Input("user")
  public user: IUser;
  public nativeNavbar: boolean;
  @Output() onDisconect = new EventEmitter();
  constructor(
    public alertCtrl: AlertController,
    protected navCtrl: NavController,
    public eventService: EventService,
    public router: Router
  ) {
    this.darkMode = false;
    this.nativeNavbar = false;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.selected = event.url;
      });
  }
  segmentChanged(ev: any) {
    this.navCtrl.navigateRoot(ev);
  }
  public darkModeOn() {
    this.darkMode = true;
    this.eventService.sendDarkMode(true);
  }
  public darkModeOff() {
    this.darkMode = false;
    this.eventService.sendDarkMode(false);
  }
  public closeSession() {
    this.user = null;
    this.onDisconect.emit(null);
  }
}
