import { Injectable } from "@angular/core";
import {
  NavController,
  ToastController,
  AlertController,
  LoadingController,
} from "@ionic/angular";

import { Router } from "@angular/router";
import { ArrayUtils } from "../utils/ArrayUtils";
import { PageBase } from "./PageBase";

@Injectable()
export class PaginaLlista extends PageBase {
  STATE_LOADING: number = 1;
  STATE_READY: number = 3;
  STATE_LOST_CONNECTION: number = 4;
  STATE_EMPTY: number = 5;
  /** Llista que es visualitza en la vista */
  public viewItems: any[] = [];
  /** Llista que està en memoria */
  public workItems: any[] = [];
  /** quantitat d'items que es visualitzen  */
  protected paginationCount: number = 10;
  public state: number = this.STATE_LOADING;

  protected funcioActualitzacio: () => Promise<void>;
  protected funcioPaginacio: (reg: number) => Promise<any[]>;
  constructor(
    protected route: Router,
    protected navCtrl: NavController,
    protected toastCtlr: ToastController,
    protected alertCtlr: AlertController,
    protected loadingCtrl: LoadingController
  ) {
    super(route, navCtrl, toastCtlr, alertCtlr, loadingCtrl);
  }
  /**
   * Inicia la llista de cerca
   * @param llista Llista d'items que es vol llista per pantalla
   * @param fActualitzacio funcio d'actualitzacio per fer el refresh
   * @param numpagina la el nombre de items per cada paginació
   */
  public iniciarLlista(
    llista: any[],
    fActualitzacio: () => Promise<void>,
    fPaginacio: (reg: number) => Promise<any[]>,
    numpagina: number
  ): void {
    this.state = this.STATE_LOADING;
    this.viewItems = [];
    if (numpagina) this.paginationCount = numpagina;
    this.funcioActualitzacio = fActualitzacio;
    this.funcioPaginacio = fPaginacio;
    this.workItems = llista;
    // S'inicia la funcio d'actualització si accedeix amb una llista de treball es carrega i despres s'actualitza
    if (this.workItems && this.workItems.length > 0) {
      this.nextPage();
      if (this.funcioActualitzacio) this.funcioActualitzacio();
    } else if (this.funcioPaginacio) {
      // Si esta buit i la funció paginar està informada, s'executa la paginacio
      this.nextPage();
    } else if (this.funcioActualitzacio) {
      this.funcioActualitzacio()
        .then((t) => {
          if (this.workItems.length == 0) this.state = this.STATE_EMPTY;
          else {
            this.nextPage();
          }
        })
        .catch((e) => {
          this.state = this.STATE_EMPTY;
          throw e;
        });
    } else {
      // Si no hi ha funcio d'actualització
      if (!this.workItems || this.workItems.length == 0) {
        this.state = this.STATE_EMPTY;
      } else {
        this.viewItems = [];
        this.nextPage();
      }
    }
  }

  /**
   * Actualitzar llista per força un canvi
   * @param llista
   */
  public updateList(llista: any[]) {
    this.workItems = llista;
    this.viewItems = [];
    for (
      var i = 0;
      i < this.paginationCount && this.workItems.length > this.viewItems.length;
      i++
    ) {
      this.viewItems.push(this.workItems[this.viewItems.length]);
    }
    if (!this.viewItems || this.viewItems.length == 0) {
      this.state = this.STATE_EMPTY;
    } else {
      this.state = this.STATE_READY;
    }
  }
  /**
   * Metode per neteixar la llista de treball
   * */
  public cleanList() {
    this.viewItems = [];
  }
  /**
   * Per pagina una nova pagina en el llistat
   * */
  public nextPage(): void {
    if (this.funcioPaginacio) {
      this.funcioPaginacio(this.workItems.length)
        .then((t) => {
          if (t) this.workItems.push(...t);
          if (this.workItems.length == 0) this.state = this.STATE_EMPTY;
          else this.state = this.STATE_READY;
          for (
            var i = 0;
            i < this.paginationCount &&
            this.workItems.length > this.viewItems.length;
            i++
          ) {
            this.viewItems.push(this.workItems[this.viewItems.length]);
          }
        })
        .catch((e) => {
          this.state = this.STATE_LOST_CONNECTION;
          throw e;
        });
    } else {
      for (
        var i = 0;
        i < this.paginationCount &&
        this.workItems.length > this.viewItems.length;
        i++
      ) {
        this.viewItems.push(this.workItems[this.viewItems.length]);
      }
      // Si no hi ha resultats per pantalla
      if (this.viewItems.length > 0) {
        this.state = this.STATE_READY;
      } else {
        this.state = this.STATE_EMPTY;
      }
    }
  }
  /**
   * Funcio per fer la paginació de una llista
   * @param infiniteScroll UI infiniteScroll de la capa presentació
   */
  public async ferScrollInfinit(event: any) {
    setTimeout(() => {
      this.nextPage();
      event.target.complete();
    }, 800);
  }
  /**
   * Funcio per refrescar la pagina en format llista
   * @param refresher UI Refresher de la capa presentació
   */
  public async ferActualitzar(event: any) {
    if (this.funcioActualitzacio) {
      await this.funcioActualitzacio();
      if (this.workItems.length == 0) this.state = this.STATE_EMPTY;
      else {
        // TODO corregir

        ArrayUtils.replaceGenericElementsOfArray(
          this.viewItems,
          this.workItems
        );
      }
      event.target.complete();
    } else {
      this.presentAlert("Error", "No hay actualitzacion");
      event.target.complete();
    }
  }
}
