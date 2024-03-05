export interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  dayAdd24(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
}
