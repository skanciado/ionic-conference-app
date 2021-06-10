import { Comparable, ComprableUtils, IComparable } from "./comparable";

/**
 * Clase de utilizació per treballar arrays
 */
export class ArrayUtils {
  /**
   * Substitueix els elements actuals amb els elements nous
   * @param origen array origen
   * @param nuevo array amb novetats
   */
  static replaceElementsOfArray(
    origen: IComparable[],
    nuevo: IComparable[]
  ): IComparable[] {
    origen.forEach(function (entry, index) {
      let a = nuevo.find((t) => {
        return t.comparar(entry);
      });
      if (a) origen[index] = a;
    });
    return origen;
  }
  /**
   * Substitueix els elements actuals amb els elements nous
   * @param origen array origen
   * @param nuevo array amb novetats
   */
  static replaceGenericElementsOfArray(origen: any[], nuevo: any[]): any[] {
    origen.forEach(function (entry, index) {
      let a = nuevo.find((t) => {
        return ComprableUtils.comparar(entry, t);
      });
      if (a) origen[index] = a;
    });
    return origen;
  }
  /**
   * Elimina l'element de l'array
   * @param element
   * @param array
   */
  static removeElement(element: IComparable, array: IComparable[]) {
    let i = array.findIndex((cas) => {
      return cas.comparar(element);
    });
    if (i >= 0) {
      array.splice(i, 1);
    }
  }
  /**
   * Elimina l'element de l'array
   * @param element
   * @param array
   */
  static removeGenericElement(element: any, array: any[]) {
    let i = array.findIndex((cas) => {
      return ComprableUtils.comparar(cas, element);
    });
    if (i >= 0) {
      array.splice(i, 1);
    }
  }
}
