/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListaTableros3Component } from './listaTableros3.component';

describe('ListaTableros3Component', () => {
  let component: ListaTableros3Component;
  let fixture: ComponentFixture<ListaTableros3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaTableros3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTableros3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
