import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/public",
    pathMatch: "full",
  },
  {
    path: "public",
    loadChildren: () =>
      import(`./publicModule/public.module`).then(
        (module) => module.PublicModule
      ),
  },
  {
    path: "schedule",
    loadChildren: () =>
      import("./pages/schedule/schedule.module").then((m) => m.ScheduleModule),
  },
  {
    path: "speaker",
    loadChildren: () =>
      import("./pages/speaker-list/speaker-list.module").then(
        (m) => m.SpeakerListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
