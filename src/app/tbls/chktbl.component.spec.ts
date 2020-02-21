import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChktblComponent } from './chktbl.component';

describe('ChktblComponent', () => {
  let component: ChktblComponent;
  let fixture: ComponentFixture<ChktblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChktblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChktblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
