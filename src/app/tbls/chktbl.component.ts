import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Header,HeaderService } from '../services/header.service';
import { Chktbl,PackService } from '../services/pack.service';

@Component({
  selector: 'app-chktbl',
  templateUrl: './chktbl.component.html',
  styleUrls: ['./chktbl.component.scss']
})
export class ChktblComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // @ViewChild("paginators", {static: false}) toFocus: ElementRef;

  dataSource:MatTableDataSource<Chktbl>;

  displayedColumns = ['pacno','gcode','quant','realg','realq','result'];

  constructor(public headerservice: HeaderService,
              public packservice: PackService,
              private elementRef: ElementRef)               {
     this.dataSource= new MatTableDataSource<Chktbl>(this.packservice.getChktbl());
  }

  ngOnInit(): void {
    //他コンポーネントからの更新
    this.packservice.observe.subscribe(() => this.updateData());
    console.log("chktbl_oninit",new Date());
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log("chktbl_afterviewinit",new Date());
    // this.dataSource.sort = this.sort;
  }
  
  checkPac(i: number): void {
    this.packservice.setOk(i);
    this.updateData();
  }

  updateList(row: Chktbl, pr1: string, pr2: string){
    if (row[pr1] == 0 || row[pr1] == ''){ return; }
    let j:number = this.packservice.pack.findIndex(obj => obj.pacno == row.pacno);
    let k:number = this.packservice.pack[j].detas.findIndex(obj => obj.rowid == row.rowid);
    this.packservice.pack[j].detas[k][pr1] = row[pr1];
    if (this.packservice.pack[j].detas[k][pr1] != this.packservice.pack[j].detas[k][pr2]) {
      this.packservice.pack[j].detas[k].result = 'NG';
      this.packservice.pack[j].resul = 'NG';
    } else if (this.packservice.pack[j].detas[k][pr1]===this.packservice.pack[j].detas[k][pr2]) {  
      this.packservice.pack[j].detas[k].result = 'OK';
      this.packservice.pack[j].resul = 'OK';
      for(let l = 0; l < this.packservice.pack[j].detas.length; l++) {
        if ( this.packservice.pack[j].detas[k].result === 'NG' ){
          this.packservice.pack[j].resul = 'NG';
        }
      }
    }
    this.updateData();
  }
  onEnter(): void {
    console.log("Enter",this.elementRef.nativeElement.querySelector('button'));
    this.elementRef.nativeElement.querySelector('button').focus();
  }
  swipe(eType){
    console.log(eType);
  }  
  
  setBgcolor(res: string): string {
    let color:string;
    if ( res === 'OK' ){
      color = 'lightgray';
    } else if ( res === 'NG' ) {
      color = 'red';  
    }
    return color;
  } 
  
  updateData(): void {
    //tableのデータソース更新
    this.dataSource= new MatTableDataSource<Chktbl>(this.packservice.getChktbl());
    this.dataSource.paginator = this.paginator;
    // console.log(this.packservice.getChktbl());
  }
}
