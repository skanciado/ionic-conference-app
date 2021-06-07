import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map, timeout } from "rxjs/operators";

import { RestService } from "./RestBase.service";
import { StoreData } from "./storage.data";
import { IUser, IResponse } from "../entities/Interfaces";
/**
 * Clase responsable de les accions de l usuari sobre el seu compte
 */
@Injectable({
  providedIn: "root",
})
export class AuthenticateService extends RestService {
  constructor(protected http: HttpClient, protected store: StoreData) {
    super(http, store);
  }
  /**
   * Metodo para cambiar el password
   * @param oldpass
   * @param newpass
   * @param confirmpass
   */
  canviarContrasenya(
    usuari: String,
    oldpass: String,
    newpass: String,
    user: IUser
  ): Observable<IResponse> {
    let changePass$ = this.http.post<IResponse>(
      `${this.obtenirURLServidor()}/api/v1.0/autenticacio/password`,
      JSON.stringify({
        Usuari: usuari,
        PasswordActual: oldpass,
        PasswordNou: newpass,
      }),
      this.obtenirHeaders(user)
    );

    return changePass$;
  }
  /**
   * Funció per enviar un correo per resetejar contrasenya
   * @param user
   */
  oblidarConstrasenya(usuari: String): Observable<IResponse> {
    let oblidarContrasenya$ = this.http.get<IResponse>(
      `${this.obtenirURLServidor()}/api/v1.0/autenticacio/contrasenya/oblidar?email=` +
        usuari,
      this.obtenirHeaders(null)
    );

    return oblidarContrasenya$;
  }
}
