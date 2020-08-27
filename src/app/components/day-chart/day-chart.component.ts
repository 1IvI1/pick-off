import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const ChartSetterKeys: Array<string> = [
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00'
];

interface ChartSetter {
  [key: string]: number;
}

export interface InputData {
  value: number;
  time: string;
}

@Component({
  selector: 'app-day-chart',
  templateUrl: './day-chart.component.html',
  styleUrls: ['./day-chart.component.scss']
})
export class DayChartComponent implements OnInit {
  /** FIXME: use new Map() */
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
  /**TODO cheange all values types */
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
    console.log("From daily: ", this.data)
    this.setChartValues(this.data);
  }
}
