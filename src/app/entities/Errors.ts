export class ErrorGeneric {
  missatge: string;
  constructor(missatge: string) {
    this.missatge = missatge;
  }
}
export class ErrorCredentials extends ErrorGeneric {
  constructor(missatge?: string) {
    if (missatge) super(missatge);
    else super("Error Credenciales ....");
  }
}
export class ErrorRefreshCredential extends ErrorGeneric {
  constructor(missatge?: string) {
    if (missatge) super(missatge);
    else super("Credencials caducades, actualitzando Credencials....");
  }
}

export class ErrorWithOutConection extends ErrorGeneric {
  constructor(missatge?: string) {
    if (missatge) super(missatge);
    else super("No hi ha conexió a internet");
  }
}

export class ErrorServer extends ErrorGeneric {
  codihttp: number;
  constructor(httpcode: number, missatge: string) {
    super(missatge);
    this.codihttp = httpcode;
  }
}
export class ErrorLocalStore extends ErrorGeneric {
  constructor(detall: string) {
    super(detall);
  }
}
