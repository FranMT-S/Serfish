import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { AuthService } from '../../../auth/services/auth.service';
import { ClimateService } from '../climate/services/climate.service';
import { CurrentWeather, Current, Icon } from '../climate/interfaces/climate';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
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
export class OpeningComponent implements OnInit, AfterViewInit {
  usuario!: Usuario;
  imageUrl = '';
  currentWeather: CurrentWeather = {
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
    title:{
      display:true,
      text:"Especies con mas registros"
    },
    legend: {
      position: 'top',
    },

  };
  public pieChartLabels: Label[] = [['Caguacha', 'Sales'], ["Robalo"], "Bagre"];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  constructor(private authService: AuthService, private ClimateService: ClimateService) { }

  // Solicion Twitter
  ngAfterViewInit(): void {
    (<any>window).twttr.widgets.load();
  }

  ngOnInit(): void {
    this.usuario = this.authService.user;
    this.imageUrl = this.authService.getImageUrl();

    this.ClimateService.getWeatherCurrent().subscribe(res => {
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



  // changeLegendPosition(): void {
  //   this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  // }




  ///BORRAR
  public barChartOptions2: ChartOptions = {
    responsive: true,
    title:{
      display:true,
      text:"Especies con menos actividad"
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels2: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType2: ChartType = 'bar';
  public barChartLegend2 = true;

  public barChartData2: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Robalo' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Bagre' }
  ];
  /////////
}
