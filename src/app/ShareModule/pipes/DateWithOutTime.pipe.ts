import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "DateWithOutTime",
})
export class DateWithOutTime implements PipeTransform {
  transform(value: string): any {
    if (!value) {
      return "";
    }

    return value.substring(11, 16);
  }
}
