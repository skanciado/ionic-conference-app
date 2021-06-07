 
import { Injectable } from '@angular/core'; 
import { StoreData } from './storage.data';  
import { Platform } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
/**
 * Classe de Informació del Dispostiu
 */
@Injectable({
    providedIn: 'root',
})
export class DeviceService {
    protected entornWeb:boolean = false;
    protected plataforma:string = "web";
    protected pantallaGran:boolean = false;
    protected versio:number ;
    protected senseConexio:boolean = false ;
    constructor( 
        protected storeData: StoreData,     
        protected platform: Platform,
        protected appVersion:AppVersion) { 
            this.plataforma =  platform.platforms.toString();
            this.pantallaGran =  (platform.is("desktop") ||  platform.is("tablet") );
            this.entornWeb =  !(platform.is("android") ||  platform.is("ios") );
            if (!this.entornWeb) {
                this.appVersion.getVersionNumber().then(t => {
                     
                    let version: string[] = t.split("."); 
                    if (version.length == 1)
                    this.versio = (Number.parseInt(t));
                    else { 
                        this.versio = (Number.parseInt(version[0]) * 10000 + Number.parseInt(version[1]) * 100 + Number.parseInt(version[2]));
                    }
                    this.versio = Number.parseInt(version[0]) * 10000 + Number.parseInt(version[1]) * 100 + Number.parseInt(version[2])
                  }).catch(t => {
                    this.versio = 0; 
                  });

            }
    }
    /**
     * Valida si el dispositiu es un entorn Web o compilat en dispositiu
     */
    public esEntornWeb() {
        return this.entornWeb;
    }
    /**
     * Retorna si s'està executan en un dispositiu Tablet o Desktop
     */
    public esPantallaGran() {
        return this.pantallaGran
    }
    /**
     * Funcio per coneixer l'estat de la conexio
     */
    public teConexio() {
        return !this.senseConexio;
    }
    public esConexioActiva() {
        return !this.senseConexio;
    }
     /**
     * Funcio per activar l'estat  conexio
     */
    public activaConexio(){
        this.senseConexio = false;
    }
    /**
     * Funcio per desactivar l'estat  conexio
     */
    public desActivaConexio(){
        this.senseConexio = true;
        //setTimeout(1000, )
    }
    /**
     *  Obtenir Versio 
     */
    public obtenirVersio() {
        return this.versio;
    }
    /**
     * Obtenir el tipus de plataforma Android IOs Web
     */
    public obtenirPlataformes() {
        return this.plataforma;
    }
}

