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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
