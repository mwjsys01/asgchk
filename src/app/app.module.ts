import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
// import { HammerModule, HAMMER_GESTURE_CONFIG, HAMMER_LOADER } from '@angular/platform-browser';
// import { GestureConfig } from '@angular/material/core';
// import { HAMMER_PROVIDERS } from '@angular/platform-browser'

import { GraphQLModule } from './graph-ql/graph-ql.module';
import { Tab01Component } from './tabs/tab01.component';
import { Tab02Component } from './tabs/tab02.component';
import { MaterialModule } from './material.module';
import { ChktblComponent } from './tbls/chktbl.component';

@NgModule({
  declarations: [
    AppComponent,
    Tab01Component,
    Tab02Component,
    ChktblComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    GraphQLModule,
    // HammerModule,
    MaterialModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
