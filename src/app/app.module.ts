import { NgModule } from '@angular/core';
import 'hammerjs';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ListaTablerosComponent } from './listaTableros/listaTableros.component';
import { TableComponent } from './table/table.component';
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
