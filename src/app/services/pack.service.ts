import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Detail {
  gcode: string;
  quant: number;
  realg: string;
  realq: number;
  result: string;
}

export interface Pack {
  pacno: string;
  detas: Detail[];
}

export interface Chktbl {
  pacno: string;
  rowsp: number;
  gcode: string;
  quant: number;
  realg: string;
  realq: number;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class PackService {
  public pack: Pack[]=[];
  public chktbl: Chktbl[]=[];
  public subject = new Subject<string>();
  public observe = this.subject.asObservable();

  constructor() { }
  resetPack() : void { this.pack = new Array(); }
  addPack(p_pacno:string,p_detas:Detail) : void {
　　let i:number = this.pack.findIndex(obj => obj.pacno == p_pacno);
    if ( i > -1 ){
　　　　this.pack[i].detas.push(p_detas);　　　
    }else{
      let adDeta: Detail[]=[];
      adDeta.push(p_detas);
      let adPack: Pack = {pacno:p_pacno,detas:adDeta};      
　　　　this.pack.push(adPack);
    }
  }
  setOk(i:number) : void {
    let j:number = this.pack.findIndex(obj => obj.pacno == this.chktbl[i].pacno);
    console.log(this.chktbl);
    for(let k=0; k < this.pack[j].detas.length; k++) {
      this.pack[j].detas[k].realg = this.pack[j].detas[k].gcode;
      this.pack[j].detas[k].realq = this.pack[j].detas[k].quant;
      this.pack[j].detas[k].result = 'OK';
    }
  }
  getChktbl():Chktbl[] {
    this.chktbl = new Array();
    for(let i = 0; i < this.pack.length; i++) {
    　let lcpacno : string = this.pack[i].pacno;
      for(let j = 0; j < this.pack[i].detas.length; j++) {
        let lcrowsp : number;
        if ( j === 0 ){
          lcrowsp = this.pack[i].detas.length;
        } else {
          lcrowsp = 0;
        }
      　const chk:Chktbl = {pacno: lcpacno,
                            rowsp: lcrowsp,
                            gcode: this.pack[i].detas[j].gcode,
                            quant: this.pack[i].detas[j].quant,
                            realg: this.pack[i].detas[j].realg,
                            realq: this.pack[i].detas[j].realq,
                            result: this.pack[i].detas[j].result
                            };
        this.chktbl.push(chk);
      }
    }
    console.log(this.chktbl);
    return this.chktbl;
  }
}
