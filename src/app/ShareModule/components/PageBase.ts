import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  ToastController,
  AlertController,
  LoadingController,
  NavController,
} from "@ionic/angular";
import { IUser } from "../../entities/Interfaces";
/**
 *  Pagina base d una pagina genèrica
 * */
@Injectable()
export abstract class PageBase {
  public userSession: IUser;
  constructor(
    protected route: Router,
    protected navCtrl: NavController,
    protected toastCtrl: ToastController,
    protected alertCtrl: AlertController,
    protected loadingCtrl: LoadingController
  ) {}

  /**
   * Metode per navegar a una url
   * @param ruta
   */
  navegate(ruta: string) {
    this.navCtrl.navigateRoot(ruta);
  }
  /**
   * Metode per navegar a una url
   * @param ruta
   */
  navegateTo(ruta: string) {
    this.navCtrl.navigateForward(ruta);
  }
  /**
   * Metode per navegar cap a enrera
   * @param ruta
   */
  navegateBack(url?: string) {
    if (url) {
      this.navCtrl.navigateBack(url);
    } else this.navCtrl.back();
  }
  /**
   * Presentar una alerta a l usuario
   * @param title titola de l'alerta
   * @param message missatge a presentar
   */
  public async presentAlert(title: string, message: string): Promise<void> {
    // create an alert instance
    let alert = await this.alertCtrl.create({
      header: title,
      message: message,
    });
    return alert.present();
  }
  /**
   * Presentar Missatge a l'usuari
   * @param message missatge a presentar
   * @param time temps de durada del missatge
   */
  public async presentToast(message: string, time: number) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: time,
    });
    toast.present();
  }

  /**
   * Presentar per presentar un error de credencials
   * */
  public async presentMessageCredentialError() {
    this.presentAlert("Credenciales erroneas", "Credenciales caducadas");
  }
  public async presentMessageWithOutConexion() {
    let toast = await this.toastCtrl.create({
      message:
        '<ion-icon class="mitja" color="blanc" name="wifi"></ion-icon>  Lost Connection',
      color: "primary",
      position: "middle",
      duration: 1000,
    });
    toast.present();
  }

  public async presentConexionAvailable() {
    let toast = await this.toastCtrl.create({
      message:
        '<ion-icon class="mitja" color="blanc" name="wifi"></ion-icon>  Connection available',
      color: "verd",
      position: "middle",
      duration: 1000,
    });
    toast.present();
  }
  /**
   * Presentar per presentar un error
   * @param message
   */
  public async presentErrorMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      cssClass: "toastError",
      duration: 2000,
    });
    toast.present();
  }

  /**
   * Presentar per presentar amb un boto acceptar
   * @param message
   */
  public async presentMessageButton(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      // showCloseButton: true,
      // closeButtonText: 'Ok'
    });
    toast.present();
  }

  /**
   * Missatge de confirmació simple
   * @param titol Titol de PopUp
   * @param missatge Missatge del PopUp
   */
  public async presentConfirmationMessage(
    tittle: string,
    message: string
  ): Promise<Boolean> {
    var promise = new Promise<Boolean>((resolve, reject) => {
      const alert = this.alertCtrl
        .create({
          header: tittle,
          message: message,
          buttons: [
            {
              text: "No",
              role: "cancel",
              handler: () => {
                resolve(false);
              },
            },
            {
              text: "Si",
              handler: () => {
                resolve(true);
              },
            },
          ],
        })
        .then((c) => {
          c.present();
        });
    });
    return promise;
  }
  /**
   * Presentar un PopUp per confirmar accions
   * @param action Accio a relaitzar Ex. Esborrar, Anullar ....
   * @param what El que , ex. l'Esdeveniment, Publicació ....
   * @param info Notes del missatge Ex. Avis: Tota la informació s'esborrara
   */
  public presentConfirmationAction(
    action: string,
    what: string,
    info: string
  ): Promise<Boolean> {
    let message = "Segur que desitja " + action + " " + what + " ? ";
    if (info) message += "<p class='avis'>Avís:" + info + "</p>";
    var promise = new Promise<Boolean>((resolve, reject) => {
      const alert = this.alertCtrl
        .create({
          header: "Confirmació d'acció",
          message: message,
          buttons: [
            {
              text: "Cancelar",
              role: "cancel",
              handler: () => {
                resolve(false);
              },
            },
            {
              text: action,
              handler: () => {
                resolve(true);
              },
            },
          ],
        })
        .then((c) => {
          c.present();
        });
    });
    return promise;
  }

  /**
   * Presentar popup carregant
   * @param missatge
   */
  presentarCarregant(missatge: string): Promise<HTMLIonLoadingElement> {
    const loading = this.loadingCtrl.create({
      message: missatge,
      duration: 7000,
    });
    return loading;
  }
}
