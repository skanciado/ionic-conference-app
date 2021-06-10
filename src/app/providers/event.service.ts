import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventService {
  private withoutConnection: Subject<Boolean> = new Subject();
  private errorSubject: Subject<string> = new Subject();
  private darkMode: Subject<Boolean> = new Subject();
  sendDarkMode(darkmode: boolean) {
    this.darkMode.next(darkmode);
  }
  sendEventWithoutConnection() {
    this.withoutConnection.next(false);
  }
  sendEventWithConnection() {
    this.withoutConnection.next(true);
  }
  sendEventError(message: string) {
    this.errorSubject.next(message);
  }
  getObservableError(
    next?: (value: string) => void,
    error?: (error: any) => void,
    complete?: () => void
  ) {
    return this.errorSubject.subscribe({
      next: next,
      error: error,
      complete: complete,
    });
  }
  getObservableDarckMode(
    next?: (value: boolean) => void,
    error?: (error: any) => void,
    complete?: () => void
  ) {
    this.darkMode.subscribe({
      next: next,
      error: error,
      complete: complete,
    });
  }
  getObservableConexio(
    next?: (value: Boolean) => void,
    error?: (error: any) => void,
    complete?: () => void
  ) {
    this.withoutConnection.subscribe({
      next: next,
      error: error,
      complete: complete,
    });
  }
}
