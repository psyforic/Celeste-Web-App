/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModesComponent } from './modes.component';

describe('ModesComponent', () => {
  let component: ModesComponent;
  let fixture: ComponentFixture<ModesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
