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

  dataSource:MatTableDataSource<Chktbl>;
  public ctnno:number;
  public gcdfi:string;
  public resfi:string;
  
  displayedColumns = ['pacno','gcode','quant','realg','realq','result'];

  constructor(public headerservice: HeaderService,
              public packservice: PackService,
              private elementRef: ElementRef)               {
     this.dataSource= new MatTableDataSource<Chktbl>(this.packservice.getChktbl());
  }

  ngOnInit(): void {
    //他コンポーネントからの更新
    // console.log("chktbl_oninit",new Date());
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      // this.packservice.observe.subscribe(() => this.updateData());
      this.packservice.observe.subscribe();
    });
    this.dataSource.filterPredicate = (data: Chktbl, filtersJson: string) => {
      // console.log("init",data);
      // console.log("init_fil",filtersJson);
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);
      filters.forEach(filter => {
        // console.log("init_fil",filter.value);          
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean);
    };
    // this.updateData();
    // console.log("chktbl_afterviewinit",new Date());
    // this.dataSource.sort = this.sort;

  }
  
  checkPac(i: number): void {
    // const filterbk:string = this.gcdfi;
    // this.dataSource.filter = '';
    // console.log("filterクリア前",i)
    // console.log("filterクリア前index",i)
    // console.log("filterクリア前length",this.dataSource.filteredData.length)
    // this.gcdfi = '';
    // console.log("filterクリア後index",i)
    // console.log("filterクリア後length",this.dataSource.filteredData.length)
    let j:number = this.packservice.chktbl.findIndex(obj => obj.rowid == i);

    this.packservice.setOk(j);
    // console.log("tbldata編集後",new Date())
    this.updateData();
    // console.log("tbldata編集後",i)

    this.packservice.save_det(this.packservice.chktbl[j]);
    // this.gcdfi = filterbk;

    // this.dataSource.filter = filterbk;
  }

  updateList(row: Chktbl, pr1: string, pr2: string){
    if (row[pr1] == 0 || row[pr1] == ''){ return; }
    
    // this.dataSource.filter = '';
    const ctnno = row.pacno.split('-');
    let j:number = this.packservice.pack.findIndex(obj => obj.pacno == ctnno[0]);
    let k:number = this.packservice.pack[j].detas.findIndex(obj => obj.rowid == row.rowid);
    this.packservice.pack[j].detas[k][pr1] = row[pr1];
    if (this.packservice.pack[j].detas[k][pr1] != this.packservice.pack[j].detas[k][pr2]) {
      this.packservice.pack[j].detas[k].result = 'NG';
      // this.packservice.pack[j].resul = 'NG';
    } else if (this.packservice.pack[j].detas[k][pr1]===this.packservice.pack[j].detas[k][pr2]) {  
      this.packservice.pack[j].detas[k].result = 'OK';
      // this.packservice.pack[j].resul = 'OK';
      // for(let l = 0; l < this.packservice.pack[j].detas.length; l++) {
      //   if ( this.packservice.pack[j].detas[k].result === 'NG' ){
      //     this.packservice.pack[j].resul = 'NG';
      //   }
      // }
    }
    let flgng: Boolean = false;
    let flgmi: Boolean = false;
    for(let l=0; l < this.packservice.pack[j].detas.length; l++) {
      if (this.packservice.pack[j].detas[l].result ==='NG' ) {
        flgng = true;
      } else if (this.packservice.pack[j].detas[l].result ==='TB' ) {
        flgmi = true;
      // } else if (this.pack[j].detas[k].result ==='OK' ) {
      //   flgok = true;
      }
    }
    if (flgng) {
      this.packservice.pack[j].resul = 'NG';
    } else if (flgmi) {
      this.packservice.pack[j].resul = 'TB';
    } else {
      this.packservice.pack[j].resul = 'OK';
    }
    this.updateData();
    let i:number = this.packservice.chktbl.findIndex(obj => obj.rowid == row.rowid);
    this.packservice.save_det(this.packservice.chktbl[i]);
    // this.dataSource.filter = this.filter;
  }
  onEnter(): void {
    // console.log("Enter",this.elementRef.nativeElement.querySelector('button'));
    this.elementRef.nativeElement.querySelector('button').focus();
  }
  swipe(eType){
    console.log(eType);
  }  
  
  goCtn(ctnno:number): void {
    // console.log("goCtn",ctnno);
    if (ctnno == 0 || typeof ctnno === 'undefined'){ return; }
    // this.dataSource.filter = '';
    let i:number = this.packservice.chktbl.findIndex(
      obj => obj.pacno == ('000'+ctnno.toString()).slice(-4)
      );
    // console.log(i,this.paginator.pageSize);
    this.paginator.pageIndex = Math.floor( i / this.paginator.pageSize );
    // console.log(this.paginator.pageIndex);
    this.dataSource.paginator = this.paginator;
    // this.dataSource.filter = this.filter;
  }

  applyFilter(filterValue: string,fieldName: string):void {
    
    // console.log(filterValue);
    if (fieldName == 'gcode'){
      this.resfi = '';
    } else if  (fieldName == 'result'){
      this.gcdfi = '';
    }
    const tableFilters = [];
    tableFilters.push({
      id: fieldName,
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    // console.log("filter後",this.dataSource);
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
    // tableのデータソース更新
    this.dataSource= new MatTableDataSource<Chktbl>(this.packservice.getChktbl());
    // this.dataSource = this.packservice.getChktbl();
    // console.log("chktbl.ts updateData 終わり",new Date())
    this.dataSource.paginator = this.paginator;
    // console.log(this.packservice.getChktbl());
    this.dataSource.filterPredicate = (data: Chktbl, filtersJson: string) => {
      const matchFilter = [];
      const filters = JSON.parse(filtersJson);
      console.log("update",data);
      console.log("update_fil",filtersJson);
      
        // console.log("update_fil",filtersJson);
      filters.forEach(filter => {
        console.log("update_fil",filter.value);  
        if (typeof filter.value != 'undefined') {
          const val = data[filter.id] === null ? '' : data[filter.id];
          matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
        }
      });
      
      return matchFilter.every(Boolean);
    };
    if (this.gcdfi != ''){
      this.applyFilter(this.gcdfi,"gcode");
    } else if (this.resfi != ''){
      this.applyFilter(this.resfi,"result");
    }
  }
}
