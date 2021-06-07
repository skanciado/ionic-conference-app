import { Component, Input } from "@angular/core";

/** Compoment de carregar una barra 0-100% */
@Component({
  templateUrl: "loadingbar.comp.html",
  selector: "loading-bar",
  styleUrls: ["./loadingbar.comp.scss"],
})
export class LoadingBarComponent {
  @Input("info")
  public informacio: String = "";
  @Input("percent")
  public percentatge: number = 0;

  @Input("percentW")
  public percentatgeW: number = 0;

  constructor() {
    this.percentatge = 0;
    this.percentatgeW = 30;
    this.informacio = "";
  }
}
