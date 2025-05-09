import { Component, type OnInit, HostListener, Input, SimpleChanges } from "@angular/core"
import { NgxChartsModule, LegendPosition } from "@swimlane/ngx-charts"
import { CommonModule } from "@angular/common"
import { colorSchemeChartsLight, colorSchemeChartsDark } from "../environment"


@Component({
  selector: "app-gauge-chart",
  templateUrl: "./gauge-chart.component.html",
  styleUrls: ["./gauge-chart.component.css"],
  standalone: true,
  imports: [NgxChartsModule],
})
export class GaugeChartComponent implements OnInit {
  @Input() chartType:string = "gauge180"
  @Input() chartData: any[] = []
  @Input() isDarkMode = false
  @Input() height!: number;
  @Input() width!: number;
  @Input() gaugeUnits: any;

  dimensiones: [number, number] = [this.width, this.height]
  legendPosition: LegendPosition = LegendPosition.Below

  colorScheme:any = colorSchemeChartsLight

  customColors = [
    { name: 'value', value: '#ff5722' }, // Color del valor numérico
    { name: 'label', value: '#673ab7' } // Color del texto de la unidad
  ];

  // Gauge specific
  data = this.chartData
  porcentaje:number = 0
  gaugeMin = 0
  gaugeMax = 0
  gaugeAngleSpan = 180
  gaugeStartAngle = -90
  legend = false
  gaugeShowAxis = false
  gaugeShowText = false
  bigGauge = true
  formatLabel: any;

  constructor() {
  }

  ngOnInit() {
    if (!this.chartData.length) {
      this.data = [
        {
          name: "Salario Promedio Anual",
          value: 0,
        },
      ]
    }
    else{
      this.data = [
        {
          name: this.chartData[0][0],
          value: this.chartData[0][1],
        },
      ]
    }
    if ( this.chartType == "gauge180"){
      this.gaugeAngleSpan = 180
      this.gaugeStartAngle = -90
    }
    else{
      this.gaugeAngleSpan = 360
      this.gaugeStartAngle = 0
    }
    if(this.isGauge()){
      this.setGauge()
    }
  }

  setGauge(){
    this.gaugeMax = this.chartData[2][1]
    this.porcentaje = Math.floor(this.chartData[0][1] / this.chartData[2][1] * 100)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["currentChartType"] ||
      changes["chartData"] ||
      changes["isDarkMode"] ||
      changes["height"] ||
      changes["width"]
    ) {
      this.updateChart()
      setTimeout(() => {
        this.dimensiones = [...this.dimensiones]
      }, 0)
    }
  }

  updateChart() {
    this.colorScheme = this.isDarkMode ? colorSchemeChartsDark : colorSchemeChartsLight
    this.dimensiones = [this.width, this.height]
    this.formatLabel = (value: number) => {
      return value.toFixed(0)
    }
    if (this.chartType === "gauge180") {
      this.gaugeAngleSpan = 180
      this.gaugeStartAngle = -90
    } else {
      this.gaugeAngleSpan = 360
      this.gaugeStartAngle = 0
    }
  }
  
  isGauge(){
    return this.chartType === "gauge180" || this.chartType === "gauge360"
  }

  onSelect(event: any) {
    console.log(event)
  }

  getTextSize(): string {
    const size = Math.min(this.width, this.height) / 10
    return `${size}px`
  }  
}