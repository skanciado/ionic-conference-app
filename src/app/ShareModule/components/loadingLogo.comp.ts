import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  templateUrl: "loadingLogo.comp.html",
  selector: "loading-logo",
  styleUrls: ["./loadingLogo.comp.scss"],
})
export class LoadingLogoComponent {
  informacio: String = "";
  percentatgeW: number = 0;
  @Output() onLoad = new EventEmitter<any>();
  tempsInterval: number = 500;
  @Input()
  set temps(temps: number) {
    this.tempsInterval = temps / (200 / 50);
  }
  private interval: any;
  private objecteResultat: any = null;
  private direccio: boolean;
  constructor() {
    this.informacio = "";
    this.percentatgeW = 0;
    this.objecteResultat = null;
    this.direccio = true;
    this.interval = setInterval((t) => {
      if (this.percentatgeW >= 200 && this.objecteResultat != null) {
        clearInterval(this.interval);
        this.informacio = "Finalitzat";
        this.onLoad.emit(this.objecteResultat);
        return;
      }
      if (this.percentatgeW >= 200) {
        this.direccio = true;
      } else if (this.percentatgeW < 0) {
        this.direccio = false;
      }
      if (this.direccio) {
        this.percentatgeW -= 50;
      } else {
        this.percentatgeW += 50;
      }
    }, this.tempsInterval);
  }
  //@Input()
  /**
   * Funcio per carregar informacio de lpa pantalla
   * @param promesa Promesa de carrega de informacio
   * @param onload postfuncio despres de la carrega
   * @returns
   */
  public carregarPromise(promesa: Promise<any>, onload?: (a) => void) {
    if (promesa == null) {
      return;
    }
    if (onload) {
      this.onLoad.subscribe(onload);
    }
    this.informacio = "Carregant Informació";
    promesa.then((t) => {
      this.objecteResultat = t || "";
      this.informacio = "Informació Carregada";
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
