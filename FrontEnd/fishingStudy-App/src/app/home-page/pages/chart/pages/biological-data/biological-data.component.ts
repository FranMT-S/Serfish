import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartService } from '../../services/chart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { FishName, DataActivityMonth, Background, DateAndIndex, dataFrom1BarChart, DataActivityYear } from '../../interfaces/interfaces';

@Component({
  selector: 'app-biological-data',
  templateUrl: './biological-data.component.html',
  styleUrls: ['./biological-data.component.css']
})
export class BiologicalDataComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
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
  };
  public barChartOptions2: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Fecha",
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
  };

  public barChartLabels: Label[] = [];
  public barChartDateLabelsMonth: Label[] = [];
  public barChartDateLabelsYear: Label[] = [];

  public barChartType: ChartType = 'bar';
  public barChartType2: ChartType = 'line';
  public barChartType3: ChartType = 'bar';
  public barChartLegend = true;
  public barChartLegend2 = false;
  public barChartLegend3 = false;


  public barChartData: ChartDataSets[] = [];
  public barChartData2: ChartDataSets[] = [];
  public barChartData3: ChartDataSets[] = [];


  miFormulario: FormGroup = this.fb.group({
    name: ["Centropomus undecimalis", [Validators.required], []]
  })

  commonScientificName: FishName[] = [];
  color: Background[] = [
    {
      background: "#3498dbe6",
      hoverBackground: "#2980b9"
    },
    {
      background: "#1abc9ce6",
      hoverBackground: "#16a085"
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
  spinner1: boolean = true;
  spinner2: boolean = true;
  spinner3: boolean = true;

  constructor(private chartService: ChartService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    var bgColor = this.color[Math.floor(Math.random() * (4 - 0) + 0)]
    var temp = [];
    // this.chartService.getLabelActivityMonth() Obtiene los labels de las tres graficas.
    this.chartService.getLabelActivityMonth()
      .subscribe(res => {
        this.barChartDateLabelsMonth = res.labelDate.map(data => `${(data.month > 9) ? data.month : "0" + data.month}-${data.year}`)

        this.barChartDateLabelsYear = res.labelDate.map(data => `${data.year}`);
        let result = this.barChartDateLabelsYear.filter((item, index) => {
          return this.barChartDateLabelsYear.indexOf(item) === index;
        })
        this.barChartDateLabelsYear = result
      })

    this.chartService.getScientificCommunName()
      .pipe(
        //tap se encargar de obtener todos los datos registrados para reflejarlos en el selector
        tap(res => {
          this.commonScientificName = res.fishNames.map(data => {
            const csName = {
              commonName: data.commonName,
              scientificName: data.scientificName
            }
            return csName
          })
        }),
        //Transformamos el observable a getAllDataActivityMonth para graficar obtener los registros de cada tipo de pez
        switchMap(() => this.chartService.getAllDataActivityMonth(this.commonScientificName)),
        tap(res => {
          this.barChartData2 = []
          res.forEach((data, index) => {
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
            // console.log(processedDatas)
            const barCharData: dataFrom1BarChart = {
              data: [],
              label: ""
            }
            barCharData.label = dataOriginal[0].nombreCientifico;
            for (let i = 0; i < this.barChartDateLabelsMonth.length; i++) {
              const currentMonthActivity = processedDatas.find(data => data.fecha == this.barChartDateLabelsMonth[i]);
              if (currentMonthActivity) {
                barCharData.data.push(dataOriginal[currentMonthActivity.index].cantidad);
              } else {
                barCharData.data.push(0);
              }
            }
            //Salimos del ciclo for
            if (index > 4) {
              barCharData.hidden = true;
            }
            this.barChartData2.push(barCharData)
          })
          this.spinner2 = false;
          this.barChartLegend2 = true;
        }),
        switchMap(() => this.chartService.getAllDataActivityYear(this.commonScientificName))
      ).subscribe(res => {
        console.log(res)
        this.barChartData3 = []
        res.forEach((data, index) => {
          var countIndex = 0;
          const dataOriginal: DataActivityYear[] = data.dataActivityYear;
          const processedDatas: DateAndIndex[] = data.dataActivityYear.map(data => {
            const processedData: DateAndIndex = {
              fecha: `${data.year}`,
              index: countIndex
            }
            countIndex += 1;
            return processedData
          })
          //   // console.log(processedDatas)
          const barCharData: dataFrom1BarChart = {
            data: [],
            label: ""
          }
          barCharData.label = dataOriginal[0].nombreCientifico;
          for (let i = 0; i < this.barChartDateLabelsYear.length; i++) {
            const currentMonthActivity = processedDatas.find(data => data.fecha == this.barChartDateLabelsYear[i]);
            if (currentMonthActivity) {
              barCharData.data.push(dataOriginal[currentMonthActivity.index].cantidad);
            } else {
              barCharData.data.push(0);
            }
          }
          //Salimos del ciclo for
          if (index > 4) {
            barCharData.hidden = true;
          }
          this.barChartData3.push(barCharData)
        })
        this.spinner3 = false;
        this.barChartLegend3 = true;
      })

    this.chartService.getForkLengthIndividuals("Centropomus undecimalis")
      .subscribe(res => {
        this.barChartLabels = res.forkLengthAndIndividuals.map(data => `${data.length}`)
        temp = res.forkLengthAndIndividuals.map(data => data.currentTotal)
        this.barChartData = [
          { data: temp, label: this.nameSelected, backgroundColor: bgColor.background, hoverBackgroundColor: bgColor.hoverBackground, borderColor: bgColor.background }
        ]
        this.spinner1 = false;
      })

    this.miFormulario.get("name")?.valueChanges
      .pipe(
        tap(res => {
          this.nameSelected = res
          this.spinner1 = true;
        }),
        switchMap(res => this.chartService.getForkLengthIndividuals(res))
      )
      .subscribe(res => {
        bgColor = this.color[Math.floor(Math.random() * (4 - 0) + 0)]
        this.barChartLabels = res.forkLengthAndIndividuals.map(data => `${data.length}`)
        temp = res.forkLengthAndIndividuals.map(data => data.currentTotal)
        this.barChartData = [
          { data: temp, label: this.nameSelected, backgroundColor: bgColor.background, hoverBackgroundColor: bgColor.hoverBackground, borderColor: bgColor.background }
        ]
        this.spinner1 = false;
      });
  }
  showAllData(value: string) {
    if (value == "year") {
      this.barChartData3 = this.barChartData3.map(data => {
        data.hidden = false;
        return data
      })
    } else if (value === "month") {
      this.barChartData2 = this.barChartData2.map(data => {
        data.hidden = false;
        return data
      })
    }
  }
  hiddenAllData(value: string) {
    if (value == "year") {
      this.barChartData3 = this.barChartData3.map(data => {
        data.hidden = true;
        return data
      })
    } else if (value === "month") {
      this.barChartData2 = this.barChartData2.map(data => {
        data.hidden = true;
        return data
      })
    }
  }

}
