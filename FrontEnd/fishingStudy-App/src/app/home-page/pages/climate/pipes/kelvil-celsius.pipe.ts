import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvilCelsius'
})
export class KelvilCelsiusPipe implements PipeTransform {
  transform( temp:number,ceil:boolean=false) {
    if (ceil){
      return Math.ceil(temp-273.15);
    }else{
      return Math.round(temp-273.15);
    }
  }
}
