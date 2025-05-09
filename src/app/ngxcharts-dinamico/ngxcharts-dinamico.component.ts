import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { colorSchemeChartsDark, colorSchemeChartsLight } from '../environment';

@Component({
  selector: 'app-ngxcharts-dinamico',
  templateUrl: './ngxcharts-dinamico.component.html',
  styleUrls: ['./ngxcharts-dinamico.component.css'],
    standalone: true,
    imports: [CommonModule, NgxChartsModule]
})
export class NgxChartsDinamicoComponent implements OnInit {
  @Input() chartType = "line"
  @Input() chartData: any[] = []
  @Input() yLabel: string = ""
  @Input() xLabel: string = ""
  @Input() units: string[] = []
  @Input() title: string = ""
  @Input() isDarkMode = false
  @Input() height!: number;
  @Input() width!: number;



  activeEntry: any = null;
  tooltipX: number = 0;
  tooltipY: number = 0;

  colorScheme:any = colorSchemeChartsLight
  dimensiones!: [number, number];
  data:any;
  barPadding: number = 8;
  groupPadding: number = 10;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = "";
  showYAxisLabel: boolean = true;
  xAxisLabel: string = "";

  constructor() {
  }

  ngOnInit() {
    console.log(this.chartData)
    this.yAxisLabel = this.yLabel;
    this.xAxisLabel = this.xLabel;
    this.dimensiones = [this.width, this.height]
    this.data = this.buildData()
    console.log(this.width, this.height)
  }

  buildData(){
    var res:any[] = []
    for (let i = 0; i < this.chartData.length; i++) {
      var values = []
      if(this.chartType != "stackedBars"){
        for (let j = 0; j < this.chartData[i].value.length; j++){
          values.push({
            name: this.units[j],
            value: this.chartData[i].value[j]
          })
        }
      }
      else{
        for (let j = 0; j < this.chartData[i].series.length; j++){
          values.push({
            name: this.chartData[i].series[j].name,
            value: this.chartData[i].series[j].value
          })
        }
      }
      
      res.push({
        name: this.chartData[i].name,
        series:values
      })
    }
    console.log(res)
    return res
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["chartType"] ||
      changes["chartData"] ||
      changes["isDarkMode"] ||
      changes["height"] ||
      changes["width"]
    ) {
      if(this.width <=400){
        this.barPadding = 0
        this.groupPadding = 0
        this.showLegend = false
      }
      else{
        this.barPadding = 8
        this.groupPadding = 10
        this.showLegend = true
      }
      this.dimensiones = [this.width, this.height]
      this.colorScheme = this.isDarkMode ? colorSchemeChartsDark : colorSchemeChartsLight
    }
  }
  
  
  onSelect(data:any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getTextSize(): string {
    const size = Math.min(this.width, this.height) / 10
    return `${size}px`
  }
}
