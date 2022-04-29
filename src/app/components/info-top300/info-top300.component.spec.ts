import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTop300Component } from './info-top300.component';

describe('InfoTop300Component', () => {
  let component: InfoTop300Component;
  let fixture: ComponentFixture<InfoTop300Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTop300Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTop300Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
