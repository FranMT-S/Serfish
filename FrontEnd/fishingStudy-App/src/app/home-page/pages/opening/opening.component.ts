import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { AuthService  } from '../../../auth/services/auth.service';
import { ClimateService } from '../climate/services/climate.service';
import { CurrentWeather, Current, Icon } from '../climate/interfaces/climate';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

interface weatherData {
  icon: string;
  nameData: string;
  data: string;
}

@Component({
  selector: 'app-opening',
  templateUrl: './opening.component.html',
  styleUrls: ['./opening.component.css']
})
export class OpeningComponent implements OnInit {
  usuario!:Usuario;
  imageUrl = '';
  currentWeather:CurrentWeather= {
    "coord": {
      "lon": -87.2167,
      "lat": 14.1
    },
    "weather": [
      {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 299.09,
      "feels_like": 299.15,
      "temp_min": 298.79,
      "temp_max": 299.4,
      "pressure": 1020,
      "humidity": 54
    },
    "visibility": 10000,
    "wind": {
      "speed": 3.58,
      "deg": 40,
      "gust": 0
    },
    "clouds": {
      "all": 75
    },
    "dt": 1627059983,
    "sys": {
      "type": 2,
      "id": 2000378,
      "country": "HN",
      "sunrise": 1627039834,
      "sunset": 1627085989
    },
    "timezone": -21600,
    "id": 3613314,
    "name": "Comayagüela",
    "cod": 200
  };

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },

  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  constructor( private authService:AuthService ,private ClimateService:ClimateService ) { }
   
 
  ngOnInit(): void {
    this.usuario = this.authService.user;
    this.imageUrl = this.authService.getImageUrl();

    this.ClimateService.getWeatherCurrent().subscribe(res=>{
      this.currentWeather = res
    })
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    // this.pieChartLabels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }

  addSlice(): void {
    this.pieChartLabels.push(['Line 1', 'Line 2', 'Line 3']);
    this.pieChartData.push(400);
    this.pieChartColors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice(): void {
    this.pieChartLabels.pop();
    this.pieChartData.pop();
    this.pieChartColors[0].backgroundColor.pop();
  }

  // changeLegendPosition(): void {
  //   this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  // }
}
