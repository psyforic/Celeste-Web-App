/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewModeComponent } from './new-mode.component';

describe('NewModeComponent', () => {
  let component: NewModeComponent;
  let fixture: ComponentFixture<NewModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
