import { Injectable, ErrorHandler } from "@angular/core";
import { NavController } from "@ionic/angular";
import {
  ErrorGeneric,
  ErrorLocalStore,
  ErrorServer,
  ErrorWithOutConection,
} from "../entities/Errors";
import { AuthenticateService } from "../providers/authenticate.service";
import { EventService } from "../providers/event.service";
import { StoreData } from "../providers/storage.data";

@Injectable({
  providedIn: "root",
})
/**
 * Interceptador d'errors Generic de la app
 */
export class ErrorIntercept implements ErrorHandler {
  constructor(
    protected eventService: EventService,
    protected navCtrl: NavController,
    protected authenticateService: AuthenticateService,
    protected store: StoreData
  ) {}

  async handleError(error: any) {
    error = error.rejection ?? error;
    if (error instanceof ErrorWithOutConection) {
      let user = await this.store.getUser();
      this.authenticateService.refreshToken(user).subscribe({
        next: (t) => {
          if (t) {
            console.info("Credencials actualizadas");
            this.store.setUser(t);
          } else {
            this.store.cleanMemoria();
            console.info("Enviar al login");
            this.navCtrl.navigateRoot("/public/login");
          }
        },
        error: (e) => {
          console.info("Error de credencials");
          this.navCtrl.navigateRoot("/public/login");
        },
      });

      console.error("Application Error: " + error.missatge);
    } else if (error instanceof ErrorLocalStore) {
      console.error("Application Error: " + error.missatge);
      this.eventService.sendEventError(error.missatge);
    } else if (error instanceof ErrorServer) {
      this.eventService.sendEventWithoutConnection();
    } else if (error instanceof ErrorGeneric) {
      console.error("Application Error: " + error.missatge);
      this.eventService.sendEventError(error.missatge);
    } else if (error.rejection) {
      console.error(error);
      this.eventService.sendEventError(error);
    }
  }
}
