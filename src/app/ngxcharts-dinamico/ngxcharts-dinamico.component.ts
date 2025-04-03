import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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


  colorScheme: any = {
    domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"],
  }
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
    this.yAxisLabel = this.yLabel;
    this.xAxisLabel = this.xLabel;
    this.dimensiones = [this.width, this.height]
    this.data = this.buildData()
  }

  buildData(){
    var res:any[] = []
    for (let i = 0; i < this.chartData.length; i++) {
      var values = []
      for (let j = 0; j < this.chartData[i].value.length; j++){
        values.push({
          name: this.units[j],
          value: this.chartData[i].value[j]
      })
      }
      res.push({
        name: this.chartData[i].name,
        series:values
      })
    }
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
    }
  }
  
  
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getTextSize(): string {
    const size = Math.min(this.width, this.height) / 10
    return `${size}px`
  }
}
