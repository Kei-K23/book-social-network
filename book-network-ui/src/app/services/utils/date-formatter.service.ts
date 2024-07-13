import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor() { }

  public formatDate(dateString: string, format: string) {
    // Create a Date object from the string
    let date = new Date(dateString);

    // Get the year, month, and day from the Date object
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
    let day = date.getDate();

    // Create an object with the date parts
    let dateParts: { [key: string]: string | number } = {
      'YYYY': year,
      'YY': String(year).slice(-2),
      'M': month,
      'MM': month.toString().padStart(2, '0'),
      'D': day,
      'DD': day.toString().padStart(2, '0')
    };

    // Replace the format tokens with the corresponding date parts
    return format.replace(/YYYY|YY|MM|M|DD|D/g, (match) => dateParts[match] as string);
  }
}
