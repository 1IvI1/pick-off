import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Inject
} from '@angular/core';
import { IP, PORT } from '../month-chart-block/month-chart-block.component';
import { Subject, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { RequestsService } from '../../services/requests.service';
import axios from 'axios';
import { colorsArray } from './exports';

interface MonthData {
  MON: MonthDayData;
  TUE: MonthDayData;
  WED: MonthDayData;
  THU: MonthDayData;
  FRI: MonthDayData;
  SAT: MonthDayData;
  SUN: MonthDayData;
}

export interface MonthDayData {
  week: Array<{ date: string; value: number }>;
}

@Component({
  selector: 'app-month-chart',
  templateUrl: './month-chart.component.html',
  styleUrls: ['./month-chart.component.scss']
})
export class MonthChartComponent implements OnInit, OnDestroy {
  @Output() setDayChartOnOutput = new EventEmitter<string>();
  public config: PerfectScrollbarConfigInterface = {};
  colorsArray = colorsArray;
  monthData: Array<MonthDayData>;
  displayData: Array<MonthDayData>;
  start: number = 0;
  end: number = 19;

  constructor(
    private requests: RequestsService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  setStartEndPointers(type: string): void {
    const arrLength = this.monthData.length + 1;
    if (type === 'INCREMENT' && this.end !== arrLength - 1) {
      this.start = this.end;
      if (this.end + 19 <= arrLength) {
        this.end += 19;
      } else if (this.end + 19 > arrLength) {
        this.end = arrLength - 1;
      }
    } else if (type === 'DECREMENT' && this.start !== 0) {
      this.end = this.start;
      if (this.start - 19 >= 0) {
        this.start -= 19;
      } else if (this.start - 19 < 0) {
        this.start = 0;
      }
    }
    this.displayData = this.monthData.slice(this.start, this.end + 1);
    console.log(this.displayData);
  }

  setScale() {
    // const [width, height] = 
  }

  selectMaxChartValue(inputDataArr: Array<any>, data: number): number {
    const max = inputDataArr.reduce(
      (acc, inputData) => (acc = Math.max(acc, inputData.value)),
      -1
    );
    const onePercent = max / 100;
    return Math.floor(data / onePercent);
  }

  setDayChartOn(val: string): void {
    this.setDayChartOnOutput.emit(val);
  }

  selectColorByPercentage(percentage: number): string {
    if (percentage >= 0 && percentage <= 10) {
      return '#95DE64';
    } else if (percentage > 10 && percentage <= 20) {
      return '#BAE637';
    } else if (percentage > 20 && percentage <= 30) {
      return '#D3F261';
    } else if (percentage > 30 && percentage <= 40) {
      return '#FFD666';
    } else if (percentage > 40 && percentage <= 50) {
      return '#FFC069';
    } else if (percentage > 50 && percentage <= 60) {
      return '#FF9C6E';
    } else if (percentage > 70 && percentage <= 80) {
      return '#FF7875';
    } else if (percentage > 80 && percentage <= 90) {
      return '#FF4D4F';
    } else if (percentage > 90 && percentage <= 100) {
      return '#CF1322';
    }
    return '#95DE64';
  }

  setColor = (dataArray: Array<any>, data) => {
    const percentage = this.selectMaxChartValue(dataArray, data);
    return this.selectColorByPercentage(percentage);
  };

  private getWeeksDataSubsription: Subscription;

  ngOnInit(): void {
    this.setScale()
    /**FIXME put request on service | use HttpClient*/
    /**
     * service.serviceMethod(...).pipe(takeUntil(this.destroy$)).subscribe(res = > LOGIC)
     * 
     *   private readonly destroy$: Subject<boolean> = new Subject<boolean>();
          ngOnDestroy(): void {
            this.destroy$.next();
            this.destroy$.unsubscribe();
          }
     * https://rxjs-dev.firebaseapp.com/api
     * return of([...]) || instead of express.js
     * 
     */

    /**
     * TODO read about tests | create tests on SenseIT
     */
    // axios
    //   .get(`${IP + PORT}/dashboard2?startDate=2020-06-22&weeks=1`)
    //   .then(response => {
    //     console.log(response.data, 'data from request month');
    //     this.monthData = response.data;
    //   });
    this.getWeeksDataSubsription = this.requests
      .getWeeksData()
      .subscribe(response => {
        this.monthData = response;
        this.displayData = response.slice(this.start, this.end + 1);
        console.log(response);
      });
  }

  ngOnDestroy(): void {
    if (this.getWeeksDataSubsription) {
      this.getWeeksDataSubsription.unsubscribe();
    }
  }
}
