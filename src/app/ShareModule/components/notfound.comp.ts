 
import { Component, Input } from "@angular/core";

/** Compoment de carregar una barra 0-100% */
@Component({
  templateUrl: "notfound.comp.html",
  selector: "notfound",
  styleUrls: ["./notfound.comp.scss"],
})
export class NotFoundComponent {
  @Input("description")
  descripcio: String;
  @Input("iconName")
  iconName: String;

  constructor() {}
}
