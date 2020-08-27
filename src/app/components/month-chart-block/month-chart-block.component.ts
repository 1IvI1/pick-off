import { Component, OnInit } from '@angular/core';

import { InputData } from '../day-chart/day-chart.component';
import { RequestsService } from '../../services/requests.service';
import axios from 'axios';

export const IP = 'http://localhost:';
export const PORT = '3001';
@Component({
  selector: 'app-month-chart-block',
  templateUrl: './month-chart-block.component.html',
  styleUrls: ['./month-chart-block.component.scss']
})
export class MonthChartBlockComponent implements OnInit {
  showDailyReport: string = null;
  dayData: Array<InputData> = null;

  constructor(private requests: RequestsService) {}

  onDayClicked(date: string): void {
    this.showDailyReport = date;
    console.log('from day click: ', date);
    if (date) {
      this.fetchDayData(date);
    } else {
      this.dayData = null
    }
  }

  fetchDayData(date: string) {
    console.log('from fetch: ', date);
    // axios.get(`${IP + PORT}/daily?date=${date}`).then(response => {
    //   console.log(response.data.data)
    //   this.dayData = response.data.data;
    // });
    this.requests.getDayData(date).subscribe(response => {
      this.dayData = response.data
    })
  }

  ngOnInit(): void {}
}
