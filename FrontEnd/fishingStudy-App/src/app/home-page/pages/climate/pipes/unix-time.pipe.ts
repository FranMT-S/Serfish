import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTime'
})
export class UnixTimePipe implements PipeTransform {
  transform(time: number):string {
     let date = new Date(time * 1000);
     let hours = "0"+date.getHours();
     let minute = "0"+date.getMinutes();
     let seconds = "0"+date.getSeconds();
    return `${hours.substr(-2)}:${minute.substr(-2)}:${seconds.substr(-2)}`;
  }

}
