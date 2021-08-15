import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-biological-data',
  templateUrl: './biological-data.component.html',
  styleUrls: ['./biological-data.component.css']
})
export class BiologicalDataComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    title:{
      display:true,
      // fullWidth:true,
      fontSize:25,
      text:"Estructura de talla Centropomus undecimalis"
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Longitud De Horquilla",
          fontSize:18
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "Individuos capturados",
          fontSize:18
        }
      }]
    },
    showLines:true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;


  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    var temp = [];
    this.chartService.getBiologicalDate()
      .subscribe(res => {

        console.log(res.biologyData)
        this.barChartLabels = res.biologyData.map(data => `${data._id}`)
        temp = res.biologyData.map(data => data.count)
        console.log(temp);
        this.barChartData = [
          { data: temp, label: 'Centropomus undecimalis',hideInLegendAndTooltip:true, hidden:false, showLine:false,spanGaps:false }
        ]
      })
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
  }
}
