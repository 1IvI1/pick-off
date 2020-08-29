import { Component, OnInit } from '@angular/core';

import { InputData } from '../month-chart/exports';
import { RequestsService } from '../../services/requests.service';

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
    if (date) {
      this.fetchDayData(date);
    } else {
      this.dayData = null
    }
  }

  fetchDayData(date: string) {
    this.requests.getDayData(date).subscribe(response => {
      this.dayData = response.data
    })
  }

  ngOnInit(): void {}
}
