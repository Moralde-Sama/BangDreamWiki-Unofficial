import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Eventdetails2Component } from './eventdetails2.component';

describe('Eventdetails2Component', () => {
  let component: Eventdetails2Component;
  let fixture: ComponentFixture<Eventdetails2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Eventdetails2Component ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Eventdetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
