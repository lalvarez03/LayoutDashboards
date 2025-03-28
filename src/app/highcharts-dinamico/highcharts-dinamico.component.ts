import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { HighchartsService } from './highcharts.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-highcharts-dinamico',
  templateUrl: './highcharts-dinamico.component.html',
  styleUrls: ['./highcharts-dinamico.component.css'],
    standalone: true,
    imports: [CommonModule, NgxChartsModule]
})
export class HighchartsDinamicoComponent implements OnInit {
  @Input() chartType = "line"
  @Input() chartData: any[] = []
  @Input() units: string = ""
  @Input() title: string = ""
  @Input() isDarkMode = false
  @Input() height!: number;
  @Input() width!: number;

  dimensiones: [number, number] = [this.width, this.height]

  colorScheme: any = {
    domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"],
  }

  data:any;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Population';

  constructor() {
  }

  ngOnInit() {
    console.log(this.chartData)
    this.data = this.buildData()
  }

  buildData(){
    var res:any[] = []
    for (let i = 0; i < this.chartData.length; i++) {
      var values = []
      for (let j = 0; j < this.chartData[i].value.length; j++){
        values.push(this.chartData[i].value[j])
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
    if (changes["currentChartType"] || changes["chartData"] || changes["isDarkMode"]) {
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
