import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateDescWeather'
})
export class TranslateDescWeatherPipe implements PipeTransform {

  transform(description: string,main:string = ""): string {
    
    description = description.toLowerCase()
    main = main.toLowerCase()
    switch(main){
      // 1
      case "thunderstorm":
          switch(description){
          case "thunderstorm with light rain": return "tormenta eléctrica con lluvia ligera";
          case "thunderstorm with rain": return "tormenta eléctrica con lluvia";
          case "thunderstorm with heavy rain": return "tormenta eléctrica con fuertes lluvias";
          case "light thunderstorm": return "tormenta eléctrica ligera";
          case "thunderstorm": return "tormenta";
          case "heavy thunderstorm": return "tormenta eléctrica pesada";
          case "ragged thunderstorm": return "tormenta eléctrica desigual";
          case "thunderstorm with light drizzle": return "tormenta eléctrica con llovizna ligera";
          case "thunderstorm with drizzle": return "tormenta eléctrica con llovizna";
          case "thunderstorm with heavy drizzle": return "tormenta eléctrica con llovizna pesada";

          default: return description;
          }

     // 2
     case "rain":
        switch(description){
            case "light rain": return "lluvia ligera";
            case "moderate rain": return "lluvia moderada";
            case "heavy intensity rain": return "lluvia de alta intensidad";
            case "very heavy rain": return "lluvias muy fuertes";
            case "extreme rain": return "lluvia extrema";
            case "freezing rain": return "lluvia helada";
            case "light intensity shower rain": return "lluvia de lluvia de intensidad ligera";
            case "shower rain": return "aguacero";
            case "heavy intensity shower rain": return "chubascos de lluvia de gran intensidad ";
            case "ragged shower rain": return "aguacero irregular";
            default: return description;      
        }

      // 3
      case "drizzle":
        switch(description){
            case "light intensity drizzle": return "llovizna de intensidad ligera";
            case "drizzle": return "llovizna";
            case "heavy intensity drizzle": return "llovizna de intensidad pesada";
            case "light intensity drizzle rain": return "lluvia llovizna de intensidad ligera";
            case "drizzle rain": return "llovizna";
            case "heavy intensity drizzle rain": return "lluvia llovizna de alta intensidad";
            case "shower rain and drizzle": return "aguacero y llovizna";
            case "heavy shower rain and drizzle": return "aguacero y llovizna fuerte";
            case "shower drizzle": return "llovizna de aguacero ";
            default: return description;      
        }

      // 4
      case "snow":
        switch(description){
          case "light snow": return "nieve ligera";
          case "snow": return "nieve";
          case "heavy snow": return "nieve intensa";
          case "sleet": return "cellisca";
          case "light shower sleet": return "cellisca de lluvia ligera";
          case "shower sleet": return "lluvia de cellisca";
          case "light rain and snow": return "lluvia ligera y nieve";
          case "rain and snow": return "lluvia y nieve";
          case "light shower snow": return "nevada ligera de nieve ";
          case "shower snow": return "nevada de nieve";
          case "heavy shower snow": return "nevada de nieve fuerte";
          default: return description;      
        }


      // 5
      case "clean":
        switch(description){
          case "clear sky": return "cielo limpio";  
          default: return description
      }

      // 6  
      case "clouds":
        switch(description){
          case "few clouds": return "pocas nubes";  
          case "scattered clouds": return "nubes dispersas";  
          case "broken clouds": return "nubes fuertes";  
          case "overcast clouds": return "nubes nubladas";  
          default: return description
      }

      default:return description;
    }
  }

}
