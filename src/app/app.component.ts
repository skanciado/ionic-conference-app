import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";

import {
  AlertController,
  LoadingController,
  MenuController,
  NavController,
  Platform,
  ToastController,
} from "@ionic/angular";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { EventService } from "./providers/event.service";
import { PageBase } from "./ShareModule/components/PageBase";
import { StoreData } from "./providers/storage.data";
import { RestService } from "./providers/RestBase.service";
import { delay, retryWhen, tap } from "rxjs/operators";
import { IUser } from "./entities/Interfaces";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends PageBase implements OnInit {
  appPages = [
    {
      title: "Schedule",
      url: "/schedule",
      icon: "calendar",
    },
    {
      title: "Speakers",
      url: "/speaker",
      icon: "people",
    },
    {
      title: "Map",
      url: "/map",
      icon: "map",
    },
    {
      title: "About",
      url: "/about",
      icon: "information-circle",
    },
  ];
  dark: Boolean = false;
  conection: boolean = true;
  user: IUser = {
    UserName: "Daniel",
    LastName: "Horta",
    Email: "skanciado@gmail.com",
    DefaultLanguatge: "es_ES",
    Name: "Daniel",
  };
  constructor(
    protected route: Router,
    protected navCtrl: NavController,
    protected menu: MenuController,
    protected platform: Platform,
    protected router: Router,
    protected alertCtlr: AlertController,
    protected splashScreen: SplashScreen,
    protected eventService: EventService,
    protected loadingCtrl: LoadingController,
    protected statusBar: StatusBar,
    protected storeData: StoreData,
    protected restService: RestService,
    protected swUpdate: SwUpdate,
    protected toastCtrl: ToastController
  ) {
    super(route, navCtrl, toastCtrl, alertCtlr, loadingCtrl);
    this.initializeApp();
  }

  async ngOnInit() {
    this.swUpdate.available.subscribe(async (res) => {
      const toast = await this.toastCtrl.create({
        message: "Update available!",
        position: "bottom",
        buttons: [
          {
            role: "cancel",
            text: "Reload",
          },
        ],
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  async initializeApp() {
    this.inicializeObserbers();
    this.dark = await this.storeData.getDarkMode();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async onDisconect() {
    this.user = null;
    this.storeData.setUser(null);
  }
  /**
   * Inicializador de Observers
   */
  inicializeObserbers() {
    this.eventService.getObservableDarckMode((t) => {
      this.dark = t;
      this.storeData.setDarkMode(t);
    });
    // Back button intervencio
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log("BackButton block!");
    });
    // Observador de errors
    this.eventService.getObservableError((t: string) => {
      this.presentAlert("System Error", t);
    });

    // Observador de l'estat de la conexio
    this.eventService.getObservableConexio((t: boolean) => {
      console.info("Conexió " + t);

      if (t) {
        // this.deviceService.activaConexio();
        this.conection = !t;
      } else {
        if (!this.conection) this.presentConexionAvailable();
        // this.deviceService.desActivaConexio();
        this.conection = !t;
        this.restService
          .echo()
          .pipe(
            retryWhen((result) =>
              result.pipe(
                delay(10000),
                tap((error) => {
                  console.warn("ReConexio Error: " + error.missatge);
                }), // tap(() => {console.warn("Re intent conexió");}),
                delay(10000)
              )
            )
          )
          .subscribe(
            (t) => {
              console.info("Conexió Activa");
              if (this.conection) this.presentConexionAvailable();
              this.conection = false;
              //this.deviceService.activaConexio();
            },
            (e) => {
              console.warn("Sense Conexió activa");
              this.conection = true;
              //this.deviceService.desActivaConexio();
            }
          );
      }
    });
  }
}
