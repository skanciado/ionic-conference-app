import { Component, Input } from "@angular/core";

/** Compoment de carregar una barra 0-100% */
@Component({
  templateUrl: "lostconection.comp.html",
  selector: "lostconection",
  styleUrls: ["./lostconection.comp.scss"],
})
export class LostconectionComponent {
  @Input("descripcio")
  descripcio: String;
  @Input("iconName")
  iconName: String;

  constructor() {}
}
