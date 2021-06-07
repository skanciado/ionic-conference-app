import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: "HtmlIntro", pure: false })
export class HtmlIntro implements PipeTransform {
  constructor(protected _sanitizer: DomSanitizer) {}

  transform(valor: string, separador: string) {
    // For each argument
    var regex = new RegExp(separador, "g");
    valor = valor.replace(regex, "<br/>");
    return this._sanitizer.bypassSecurityTrustHtml(valor);
  }
}
