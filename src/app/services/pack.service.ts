import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Detail {
  gcode: string;
  quant: number;
  realg: string;
  realq: number;
  result: string;
  rowid: number;
}

export interface Pack {
  pacno: string;
  resul: string;
  detas: Detail[];
}

export interface Chktbl {
  pacno: string;
  // rowsp: number;
  gcode: string;
  quant: number;
  realg: string;
  realq: number;
  result: string;
  rowid: number;
  ctnrs: string;
}

@Injectable({
  providedIn: 'root'
})
export class PackService {
  public sctn:number =0;
  public okct:number =0;
  public ngct:number =0;
  public pack: Pack[]=[];
  public chktbl: Chktbl[]=[];
  public subject = new Subject<string>();
  public observe = this.subject.asObservable();

  constructor() { }
  resetPack() : void { this.pack = new Array(); }
  addPack(p_pacno:string,p_detas:Detail) : void {
    const ctnno = p_pacno.split('-');
    let i:number = this.pack.findIndex(obj => obj.pacno == ctnno[0]);
    if ( i > -1 ){
      this.pack[i].detas.push(p_detas);
      if (p_detas.result==='NG') {
        this.pack[i].resul = 'NG';
      }
    }else{
      let adDeta: Detail[]=[];
      adDeta.push(p_detas);
      let adPack: Pack = {pacno:p_pacno,resul:p_detas.result,detas:adDeta};
      this.pack.push(adPack);
    }
  }
  setOk(i:number) : void {
    const ctnno = this.chktbl[i].pacno.split('-');
    let j:number = this.pack.findIndex(obj => obj.pacno == ctnno[0]);
    let k:number = this.pack[j].detas.findIndex(obj => obj.rowid == this.chktbl[i].rowid);
    if ( this.pack[j].detas[k].result === ' ') {
      this.pack[j].detas[k].realg = this.pack[j].detas[k].gcode;
      this.pack[j].detas[k].realq = this.pack[j].detas[k].quant;
      this.pack[j].detas[k].result = 'OK';
    } else {
      this.pack[j].detas[k].realg = ' ';
      this.pack[j].detas[k].realq = 0;
      this.pack[j].detas[k].result = ' ';
    }
    let flgng: Boolean = false;
    let flgmi: Boolean = false;
    for(let l=0; l < this.pack[j].detas.length; l++) {
      if (this.pack[j].detas[l].result ==='NG' ) {
        flgng = true;
      } else if (this.pack[j].detas[l].result ===' ' ) {
        flgmi = true;
      // } else if (this.pack[j].detas[k].result ==='OK' ) {
      //   flgok = true;
      }
    }
    if (flgng) {
      this.pack[j].resul = 'NG';
    } else if (flgmi) {
      this.pack[j].resul = ' ';
    } else {
      this.pack[j].resul = 'OK';
    }

    // if ( this.pack[j].detas[0].result === ' '){
    //   this.pack[j].resul = 'OK';
    //   for(let k=0; k < this.pack[j].detas.length; k++) {
    //     this.pack[j].detas[k].realg = this.pack[j].detas[k].gcode;
    //     this.pack[j].detas[k].realq = this.pack[j].detas[k].quant;
    //     this.pack[j].detas[k].result = 'OK';
    //   }
    // } else {
    //   this.pack[j].resul = ' ';
    //   for(let k=0; k < this.pack[j].detas.length; k++) {
    //     this.pack[j].detas[k].realg = ' ';
    //     this.pack[j].detas[k].realq = 0;
    //     this.pack[j].detas[k].result = ' ';
    //   }
    // }
    console.log("setOK終わり",new Date())
  }
  getChktbl():Chktbl[] {
    this.chktbl = new Array();
    this.okct=0;
    this.ngct=0;
    for(let i = 0; i < this.pack.length; i++) {
      let lcpacno : string = this.pack[i].pacno;
      if (this.pack[i].resul ==='OK' ) {
        this.okct++;
      } else if (this.pack[i].resul ==='NG' ) {
        this.ngct++;
      }
      for(let j = 0; j < this.pack[i].detas.length; j++) {
        let lceda : number;
        if ( j > 0 ){
          lceda = j + 1;
          lcpacno = this.pack[i].pacno + '-' + lceda;
        }
        const chk:Chktbl = {pacno: lcpacno,
                            // rowsp: lcrowsp,
                            gcode: this.pack[i].detas[j].gcode,
                            quant: this.pack[i].detas[j].quant,
                            realg: this.pack[i].detas[j].realg,
                            realq: this.pack[i].detas[j].realq,
                            result: this.pack[i].detas[j].result,
                            rowid: this.pack[i].detas[j].rowid,
                            ctnrs: this.pack[i].resul
                            };
        this.chktbl.push(chk);
      }
      this.sctn = i+1;
    }
    // console.log(this.chktbl);
    // console.log("getChktbl 終わり",new Date())
    return this.chktbl;
  }
}
