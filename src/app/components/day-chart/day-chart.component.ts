import { ChartSetter, InputData } from '../month-chart/exports';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-day-chart',
  templateUrl: './day-chart.component.html',
  styleUrls: ['./day-chart.component.scss']
})
export class DayChartComponent implements OnInit {
  daysMap: ChartSetter = {
    '07:00': 0,
    '08:00': 0,
    '09:00': 0,
    '10:00': 0,
    '11:00': 0,
    '12:00': 0,
    '13:00': 0,
    '14:00': 0,
    '15:00': 0,
    '16:00': 0,
    '17:00': 0,
    '18:00': 0,
    '19:00': 0,
    '20:00': 0
  };

  @Input() data: Array<InputData>;

  @Output() closeChartOutput = new EventEmitter<null>();

  closeChart(): void {
    this.closeChartOutput.emit(null);
  }

  selectMaxChartValue(inputDataArr: Array<InputData>): number {
    return inputDataArr.reduce(
      (acc, inputData) => (acc = Math.max(acc, inputData.value)),
      -1
    );
  }
  setChartValues(inputDataArr: Array<InputData>): void {
    if (!Array.isArray(inputDataArr)) {
      return;
    }

    const maxValue = this.selectMaxChartValue(inputDataArr);
    const positionPecentage = maxValue / 100;
    let barHeight = null;
    inputDataArr.forEach(inputData => {
      barHeight = inputData.value / positionPecentage;
      this.daysMap[inputData.time] = barHeight;
    });
  }

  ngOnInit(): void {
    this.setChartValues(this.data);
  }
}
