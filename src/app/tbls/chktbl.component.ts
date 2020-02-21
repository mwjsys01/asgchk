import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Header,HeaderService } from '../services/header.service';
import { Chktbl,PackService } from '../services/pack.service';

@Component({
  selector: 'app-chktbl',
  templateUrl: './chktbl.component.html',
  styleUrls: ['./chktbl.component.scss']
})
export class ChktblComponent implements OnInit {

  dataSource:MatTableDataSource<Chktbl>;

  displayedColumns = ['pacno','gcode','quant','realg','realq','result'];

  constructor(public headerservice: HeaderService,
              public packservice: PackService)               {
     this.dataSource= new MatTableDataSource<Chktbl>(this.packservice.getChktbl());
  }

  ngOnInit(): void {
    //他コンポーネントからの更新
    this.packservice.observe.subscribe(() => this.updateData());
  }
  checkPac(i: number): void {
    this.packservice.setOk(i);
    this.updateData();
  }
  updateData(): void {
    //tableのデータソース更新
    this.dataSource= new MatTableDataSource<Chktbl>(this.packservice.getChktbl());
    console.log(this.packservice.getChktbl());
  }
}
