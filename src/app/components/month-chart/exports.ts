export const colorsArray = [
  {percents: '0-10%', color: "#95DE64"},
  {percents: '10-20%', color: "#BAE637"},
  {percents: '20-30%', color: "#D3F261"},
  {percents: '30-40%', color: "#FFD666"},
  {percents: '40-50%', color: "#FFC069"},
  {percents: '50-60%', color: "#FF9C6E"},
//   {percents: '60-70%', color: ""},
  {percents: '70-80%', color: "#FF7875"},
  {percents: '80-90%', color: "#FF4D4F"},
  {percents: '90-100%', color: "#CF1322"}
];

export const IP = 'http://localhost:';
export const PORT = '3001';
export interface ChartSetter {
  [key: string]: number;
}

export interface InputData {
  value: number;
  time: string;
}

export interface MonthData {
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