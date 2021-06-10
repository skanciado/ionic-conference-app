/**
 * Interface per comparar
 */
export interface IComparable {
  /**
   * Metode per comparar
   * @param obj
   */
  comparar(obj: Comparable): boolean;
}
export abstract class Comparable implements IComparable {
  public Id?: string;
  /**
   * Metode per comparar
   * @param obj
   */
  comparar(obj: Comparable): boolean {
    if (!obj) return false;

    if (this.Id) {
      return obj.Id == this.Id;
    } else return JSON.stringify(this) == JSON.stringify(obj);
  }
}
export class ComprableUtils {
  static comparar(obj1: any, obj2: any): boolean {
    if (!obj1) return false;
    if (!obj2) return false;

    if (obj1.Id) {
      return obj1.Id == obj2.Id;
    } else return JSON.stringify(obj2) == JSON.stringify(obj1);
  }
}
