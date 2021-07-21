import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codeImg'
})
export class CodeImgPipe implements PipeTransform {

  transform(code: string): string {
    switch(code){
      case "01d": return "../../../../../assets/clima/sol.png";
      case "01n": return "../../../../../assets/clima/lun.png";
      case "02d": return "../../../../../assets/clima/solpn.png";
      case "02n": return "../../../../../assets/clima/lunpn.png";
      case "03d": return "../../../../../assets/clima/soln.png";
      case "03n": return "../../../../../assets/clima/lunn.png";
      case "04d": return "../../../../../assets/clima/nube.png";
      case "04n": return "../../../../../assets/clima/nube.png";
      case "09d": return "../../../../../assets/clima/lluray.png";
      case "09n": return "../../../../../assets/clima/lluray.png";
      case "10d": return "../../../../../assets/clima/lluv.png";
      case "10n": return "../../../../../assets/clima/lluv.png";
      case "11d": return "../../../../../assets/clima/ray.png";
      case "11n": return "../../../../../assets/clima/ray.png";
      default: return "";
    }
  }

}
