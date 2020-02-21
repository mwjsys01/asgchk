import { Component, OnInit } from '@angular/core';
import { Header,HeaderService } from '../services/header.service';
import { Detail,Pack,PackService } from '../services/pack.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import * as Query from '../graph-ql/queries';

@Component({
  selector: 'app-tab01',
  templateUrl: './tab01.component.html',
  styleUrls: ['./tab01.component.scss']
})
export class Tab01Component implements OnInit {

  public placehold: string;
  public headid: number;

  constructor(public headerservice: HeaderService,
              public packservice: PackService,
              private apollo: Apollo) { }

  ngOnInit(): void {
    this.placehold = 'データ選択';
    this.get_Header();
  }
  read_Data(value:number):void {
    this.headerservice.header = this.headerservice.headers.filter(function(item:Header, index:number){
      if (item.headid == value) return true;}
    )[0];
    
    this.apollo.watchQuery<any>({
      query: Query.GetQuery2,
      variables: { 
        headid: this.headid
      },
    })
    .valueChanges   
    .subscribe(({ data }) => {
      this.packservice.resetPack();       
      for ( let i=0;i<data.tbldetail.length;i=i+1 ){
        let adDet: Detail = { 
          gcode:data.tbldetail[i].gcode,
          quant:+data.tbldetail[i].quant,
          realg:data.tbldetail[i].realg,
          realq:+data.tbldetail[i].realq,
          result:data.tbldetail[i].result };
        this.packservice.addPack(data.tbldetail[i].packno,adDet); 
      }
      this.packservice.subject.next();
      console.log(this.packservice);
      console.log(this.packservice.getChktbl());
    });
  }
  get_Header():void {
    this.headerservice.QueryHeaders()
      .subscribe(({ tblheader }) => {
        // console.log('tab01.ts',tblheader);
        this.headerservice.headers = tblheader;
        if (tblheader.length == 0){
          this.placehold = '該当データなし';
        } else {
          this.placehold = 'データ選択';
        }
      });
  }
}
