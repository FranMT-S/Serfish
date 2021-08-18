import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartService } from '../../services/chart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { FishName, DataActivityMonth, Background, DateAndIndex, dataFrom1BarChart } from '../../interfaces/interfaces';

@Component({
  selector: 'app-biological-data',
  templateUrl: './biological-data.component.html',
  styleUrls: ['./biological-data.component.css']
})
export class BiologicalDataComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // title: {
    //   display: true,
    //   // fullWidth:true,
    //   fontSize: 25,
    //   fontColor: "#414042",
    //   text: "Estructura de talla Centropomus undecimalis"
    // },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Longitud De Horquilla",
          fontSize: 18,
          fontColor: "#414042"
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "Individuos capturados",
          fontSize: 18,
          fontColor: "#414042"
        }
      }]
    },
    showLines: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartDateLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartType2: ChartType = 'line';
  public barChartLegend = true;


  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public barChartData2: ChartDataSets[] = [];


  miFormulario: FormGroup = this.fb.group({
    name: ["Centropomus undecimalis", [Validators.required], []]
  })

  commonScientificName: FishName[] = [];
  color: Background[] = [
    {
      background: "#34495ee6",
      hoverBackground: "#2c3e50"
    },
    {
      background: "#3498dbe6",
      hoverBackground: "#2980b9"
    },
    {
      background: "#1abc9ce6",
      hoverBackground: "#16a085"
    },
    {
      background: "#e67d22e0",
      hoverBackground: "#d35400"
    },
    {
      background: "#9b58b6e6",
      hoverBackground: "#8e44ad"
    },
    {
      background: "#e74d3ce6",
      hoverBackground: "#c0392b"
    },
  ]
  nameSelected: string = "Centropomus undecimalis";
  constructor(private chartService: ChartService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    var bgColor = this.color[Math.floor(Math.random() * (6 - 0) + 0)]
    var temp = [];

    this.chartService.getScientificCommunName()
      .pipe(
        tap(res => {
          this.commonScientificName = res.fishNames.map(data => {
            const csName = {
              commonName: data.commonName,
              scientificName: data.scientificName
            }
            return csName
          })
        }),
        switchMap(() => this.chartService.getAllDataActivityMonth(this.commonScientificName))
      ).subscribe(res => {
        this.barChartData2=[]
        res.forEach(data => {
          var countIndex = 0;
          const dataOriginal: DataActivityMonth[] = data.dataActivityMonth;
          const processedDatas: DateAndIndex[] = data.dataActivityMonth.map(data => {
            const processedData: DateAndIndex = {
              fecha: `${(data.month > 9) ? data.month : "0" + data.month}-${data.year}`,
              index: countIndex
            }
            countIndex += 1;
            return processedData
          })
          console.log(processedDatas)
          const barCharData:dataFrom1BarChart={
            data:[],
            label:""
          }
          barCharData.label = dataOriginal[0].nombreCientifico;
          for (let i = 0; i < this.barChartDateLabels.length; i++){
            const currentMonthActivity = processedDatas.find(data => data.fecha == this.barChartDateLabels[i]);
            if (currentMonthActivity){
              barCharData.data.push(dataOriginal[currentMonthActivity.index].cantidad);
            }else{
              barCharData.data.push(0);
            }
          }
          //Salimos del ciclo for
          this.barChartData2.push(barCharData)
        })
      })

    this.chartService.getForkLengthIndividuals("Centropomus undecimalis")
      .subscribe(res => {
        this.barChartLabels = res.forkLengthAndIndividuals.map(data => `${data.length}`)
        temp = res.forkLengthAndIndividuals.map(data => data.currentTotal)
        this.barChartData = [
          { data: temp, label: this.nameSelected, backgroundColor: bgColor.background, hoverBackgroundColor: bgColor.hoverBackground, borderColor: bgColor.background }
        ]
      })

    this.miFormulario.get("name")?.valueChanges
      .pipe(
        tap(res => this.nameSelected = res),
        switchMap(res => this.chartService.getForkLengthIndividuals(res))
      )
      .subscribe(res => {
        bgColor = this.color[Math.floor(Math.random() * (6 - 0) + 0)]
        this.barChartLabels = res.forkLengthAndIndividuals.map(data => `${data.length}`)
        temp = res.forkLengthAndIndividuals.map(data => data.currentTotal)
        this.barChartData = [
          { data: temp, label: this.nameSelected, backgroundColor: bgColor.background, hoverBackgroundColor: bgColor.hoverBackground, borderColor: bgColor.background }
        ]
      });

    this.chartService.getLabelActivityMonth()
      .subscribe(res => {
        this.barChartDateLabels = res.labelDate.map(data => `${(data.month > 9) ? data.month : "0" + data.month}-${data.year}`)
      })
 
  }

  // // events
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   console.log(event, active);
  // }

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
