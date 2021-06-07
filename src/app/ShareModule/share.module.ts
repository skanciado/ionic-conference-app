import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";
import { DateWithOutTime } from "./pipes/DateWithOutTime.pipe";
import { HtmlIntro } from "./pipes/HtmlIntro.pipe";
import { LoadingBarComponent } from "./components/loadingbar.comp";
import { LoadingLogoComponent } from "./components/loadingLogo.comp";
import { NotFoundComponent } from "./components/notfound.comp";
import { LostconectionComponent } from "./components/lostconection.comp";
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule],
  exports: [
    DateWithOutTime,
    HtmlIntro,
    CommonModule,
    FormsModule,
    IonicModule,
    NotFoundComponent,
    LoadingLogoComponent,
    LoadingBarComponent,
    LostconectionComponent,
  ],
  declarations: [
    DateWithOutTime,
    HtmlIntro,
    NotFoundComponent,
    LoadingLogoComponent,
    LoadingBarComponent,
    LostconectionComponent,
  ],
  providers: [],
})
export class ShareModule {}
