import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTime'
})
export class UnixTimePipe implements PipeTransform {
  days:string[]=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"]
  transform(time: number, seconds:boolean=true,daily:boolean=false):string {
    let date = new Date(time * 1000);
    if(daily){
      return this.days[date.getDay()];
    }else if(seconds){
      //  let date2 = date;
      //  date2.toLocaleString('en-US',{hour12:false})
      //  console.log(date2);
      let hours = "0"+date.getHours();
      let minute = "0"+date.getMinutes();
      let seconds = "0"+date.getSeconds();
      return `${hours.substr(-2)}:${minute.substr(-2)}:${seconds.substr(-2)}`;
    }else{
      let hours = "0"+date.getHours();
      let minute = "0"+date.getMinutes();
      return `${hours.substr(-2)}:${minute.substr(-2)}`;
    }
  }

}
