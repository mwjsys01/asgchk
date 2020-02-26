import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { PackService } from '../services/pack.service';
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
  }

  save_Data(){
    console.log(this.headerservice)
  }
}
