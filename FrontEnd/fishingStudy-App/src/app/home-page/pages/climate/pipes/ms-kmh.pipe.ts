import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msKmh'
})
export class MsKmhPipe implements PipeTransform {

  transform(ms: number):number {
    return Number(((ms*3600)/1000).toFixed(2));
  }

}
