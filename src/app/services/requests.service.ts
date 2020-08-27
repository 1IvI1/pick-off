import {
  IP,
  PORT
} from '../components/month-chart-block/month-chart-block.component';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InputData } from '../components/day-chart/day-chart.component';
import { MonthDayData } from '../components/month-chart/month-chart.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  getWeeksData(): Observable<Array<MonthDayData>> {
    return this.http.get<Array<MonthDayData>>(
      `${IP + PORT}/dashboard2?startDate=2020-06-22&weeks=1`
    );
  }
  
  getDayData(date: string): Observable<{data:Array<InputData>, date: string}> {
    return this.http.get<{data:Array<InputData>, date: string}>(`${IP + PORT}/daily?date=${date}`)
  }
}
