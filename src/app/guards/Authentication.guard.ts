import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { StoreData } from "../providers/storage.data";
@Injectable({
  providedIn: "root",
})
/**
 * Control de permisos de les pàgines
 */
export class AuthenticationGuard implements CanActivate {
  constructor(protected storeData: StoreData, protected router: Router) {}

  /**
   * Metode evaluador dels permisos
   * @param next
   * @param state
   */
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const roles: string[] = next.data["roles"];
    let usr = await this.storeData.getUser();
    if (!usr) {
      console.info("No te permisos " + next.url);
      this.router.navigate(["/public/login"]);
    }

    if (roles && roles.length > 0) {
      for (const rol of roles) {
        if (usr.Roles.indexOf(rol) >= 0) return true;
      }
      console.info("No te permisos " + next.url);
      this.router.navigate(["/public/login"]);

      return false;
    } else return true;
  }
}
