import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { IUser } from "../entities/Interfaces";
@Injectable({
  providedIn: "root",
})
export class StoreData {
  constructor(protected storage: Storage) {
    this.storage.create();
  }
  /**
   * Obtenir el usuario de session
   * @returns
   */
  public getUser(): Promise<IUser> {
    return this.storage.get("USER");
  }
  /**
   * Guardar el usuario en session
   * @param user
   * @returns
   */
  public setUser(user: IUser) {
    this.storage.set("DefaultLanguatge", user.DefaultLanguatge);
    return this.storage.set("USER", user);
  }
  public async getDefaultLanguatge(): Promise<string> {
    return this.storage.get("DefaultLanguatge");
  }
  /**
   * Esborra les variables que no son de sessio.
   */
  public async cleanMemoria() {
    this.storage.clear();
  }
}
