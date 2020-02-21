import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tab01Component } from './tabs/tab01.component';
import { Tab02Component } from './tabs/tab02.component';

const routes: Routes = [
  { path: '', 
    redirectTo: 'tab01',
    pathMatch: 'full' 
  },
  {
    path: 'tab01',
    component: Tab01Component
  },
  {
    path: 'tab02',
    component: Tab02Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
