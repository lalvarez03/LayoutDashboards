import { NgModule } from '@angular/core';
import 'hammerjs';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ListaTableros3Component } from './listaTableros3/listaTableros3.component';
  @NgModule({
    imports: [  
      CommonModule,
      BrowserModule,
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [provideHttpClient(), provideAnimations()]
  })
  export class AppModule { }
