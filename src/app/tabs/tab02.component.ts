import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { Chktbl, PackService } from '../services/pack.service';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import * as Query from '../graph-ql/queries';

@Component({
  selector: 'app-tab02',
  templateUrl: './tab02.component.html',
  styleUrls: ['./tab02.component.scss']
})
export class Tab02Component implements OnInit {

  constructor(public headerservice: HeaderService,
              public packservice: PackService,
              private apollo: Apollo
              ) { }

  ngOnInit(): void {
    
    // console.log("tab02_ngoｓninit",new Date());
  }

  ngAfterViewInit(): void {
    // console.log("tab02_afterviewinit",new Date());
  }

  save_Data(): void {
    this.apollo.mutate<any>({
    mutation: Query.UpdateStatus,
    variables: { 
      headid: this.headerservice.header.headid ,
      now : new Date()
      },
    }).subscribe(({ data }) => {
      console.log('updated data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
    console.log(this.packservice.chktbl);
    for(let i = 0; i < this.packservice.chktbl.length; i++) {
      this.packservice.save_det(this.packservice.chktbl[i]);
    }
  }

  // save_det(p_chk:Chktbl):void {
  //   console.log(p_chk);
  //   this.apollo.mutate<any>({
  //   mutation: Query.UpdateDetail,
  //   variables: {
  //     detid: p_chk.rowid ,
  //     res : p_chk.result ,
  //     reg : p_chk.realg ,
  //     req : p_chk.realq
  //     },
  //   }).subscribe(({ data }) => {
  //     console.log('updated detail', data);
  //   },(error) => {
  //     console.log('error UpdateDetail', error);
  //   });
  // }

}
