import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {BankAccounsComponent} from "./bank-accounts-component/bank-accounts.component";
import {HttpClientModule} from "@angular/common/http";
import {InfoDialogComponent} from "./info-dialog/info-dialog.component";
import {SuccessDialogComponent} from "./success-dialog/success-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    BankAccounsComponent,
    InfoDialogComponent,
    SuccessDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
