import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthChartBlockComponent } from './month-chart-block.component';

describe('MonthChartBlockComponent', () => {
  let component: MonthChartBlockComponent;
  let fixture: ComponentFixture<MonthChartBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthChartBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthChartBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
