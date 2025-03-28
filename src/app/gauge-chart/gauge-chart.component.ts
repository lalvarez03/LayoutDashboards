import { Component, type OnInit, HostListener, Input, SimpleChanges } from "@angular/core"
import { NgxChartsModule, LegendPosition } from "@swimlane/ngx-charts"
import { CommonModule } from "@angular/common"


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

  dimensiones: [number, number] = [this.width, this.height]
  legendPosition: LegendPosition = LegendPosition.Below

  colorScheme: any = {
    domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"],
  }

  customColors = [
    { name: 'value', value: '#ff5722' }, // Color del valor numérico
    { name: 'label', value: '#673ab7' } // Color del texto de la unidad
  ];

  // Gauge specific
  data = this.chartData
  porcentaje:number = 0
  gaugeMin = 0
  gaugeMax = 0
  gaugeUnits = "USD"
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
    this.colorScheme = {
      domain: this.isDarkMode ? ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF", "#6D8B74", "#E57373", "#81C784"] : ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"],
    }
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