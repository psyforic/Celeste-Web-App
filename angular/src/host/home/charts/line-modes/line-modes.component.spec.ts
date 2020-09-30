/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LineModesComponent } from './line-modes.component';

describe('LineQuotationsComponent', () => {
  let component: LineModesComponent;
  let fixture: ComponentFixture<LineModesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineModesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
