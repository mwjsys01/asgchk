import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import * as Query from '../graph-ql/queries';

export interface Header {
  headid: number;
  indate: string;
  vendor: string;
  cnt: number;
  created_at: Date;
  updated_at: Date;
  status: string;
  venname: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  public header: Header ={
    headid: 0,
    indate:'',
    vendor:'',
    cnt: 0,
    created_at:new Date(),
    updated_at:new Date(),
    status:'',
    venname:'',
  };

  public headers: Header[]=[];
  public HeaderSub = new Subject<any>();

  constructor(private apollo: Apollo) { }

  getHeader(): Header[] { return this.headers; }
  queryHeaders(){
    let HeaderSub;
    this.apollo.watchQuery<any>({
      query: Query.GetQuery1,
      })
      .valueChanges
      .subscribe(({ data ,loading }) => {
        //該当データなし表示判定のため、読込完了後に返す
        if (loading == false){
          HeaderSub = data;
          this.headers=data.tblheader;
          this.HeaderSub.next(HeaderSub);
          }
        }
      );
    return this.HeaderSub;
  }
}
