import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage-angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { FormsModule } from "@angular/forms";
import { RouteReuseStrategy } from "@angular/router";
import { ErrorIntercept } from "./interceptors/error.interceptor";
import { HttpIntercept } from "./interceptors/http.interceptor";
import { Drivers } from "@ionic/storage";
import { PublicModule } from "./PublicModule/public.module";
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: "nidus",
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    PublicModule,
  ],
  declarations: [AppComponent],
  providers: [
    InAppBrowser,
    SplashScreen,
    StatusBar,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      // processes all errors
      provide: ErrorHandler,
      useClass: ErrorIntercept,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercept,
      multi: true, // multiple interceptors are possible
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
