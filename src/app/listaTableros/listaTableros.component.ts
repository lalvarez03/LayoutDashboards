import {
  Component,
  ElementRef,
  ViewChild,
  type OnInit,
} from "@angular/core"
import { CommonModule } from "@angular/common"

import { FormsModule } from '@angular/forms';
import "gridstack/dist/gridstack.min.css"
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDragPlaceholder, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop"
import { NgxChartsDinamicoComponent } from "../ngxcharts-dinamico/ngxcharts-dinamico.component";
import { GaugeChartComponent } from "../gauge-chart/gauge-chart.component";
import { GaugeLinearComponent } from "../gauge-linear/gauge-linear.component";
import { ChartsService } from "../charts/charts.service";
import { TableComponent } from "../table/table.component";


interface ChartItem {
  id: number
  indicator: string
  system:string
  title:string
  description:string
  chartType:string

  setings: boolean
  row: number
  column: number

  data: {
    data:any[],
    units:string[],
    yLabel:string,
    xLabel:string
  }
}

@Component({
  selector: "app-lista-tableros",
  templateUrl: "./listaTableros.component.html",
  styleUrls: ["./listaTableros.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    FormsModule,
    NgxChartsDinamicoComponent,
    GaugeChartComponent,
    GaugeLinearComponent,
    TableComponent,
  ]
})
export class ListaTablerosComponent implements OnInit {
  editar:boolean = true;
  mover:boolean = false;
  modoOscuro:boolean = false;
  barraIzquierda = false;

  idsBoveda: number[] = []
  boveda: ChartItem[] = []
  idsTableros: number[] = []
  tableros: ChartItem[] = []

  gridWith: number = 0
  @ViewChild("gridBox", { static: true }) targetElement!: ElementRef
  private resizeObserver!: ResizeObserver
  constructor(
    private chartsService: ChartsService
  ) {}

  async ngOnInit() {
    await this.updateWidth()
    this.resizeObserver = new ResizeObserver(() => {
      this.updateWidth()
    })
    this.resizeObserver.observe(this.targetElement.nativeElement)
    window.addEventListener("resize", this.updateWidth.bind(this))
    //Get Dashboard Charts
    await this.chartsService.getCharts().subscribe((ids: any) => {
      this.idsTableros = ids
      this.chartsService.getChartsByIds(this.idsTableros).subscribe((data: any) => {
        console.log(data)
        this.chartsService.getConfigByIds(this.idsTableros).subscribe((config: any) => {
          for (let [i, item] of data.entries()) {
            var d;
            if(item.chartType === 'bar' || 
              item.chartType === 'line' ||
              item.chartType === 'column' ||
              item.chartType === 'pie'||
              item.chartType === 'stackedBars'){
              d = {
                data: item.data.data,
                units: item.data.units,
                yLabel: item.data.yLabel,
                xLabel: item.data.xLabel,
              }
            }
            else{
              d = {
                data: item.data.data,
                units: item.data.units,
                yLabel: "",
                xLabel: "",
              }
            }
            this.tableros.push(
              {
                id: item.id,
                indicator: item.indicator,
                system: item.system,
                title: item.title,
                description: item.description,
                setings: false,
                chartType: item.chartType,
                row: config[i].row,
                column: config[i].column,
                data: d
              }
            )
          }
        })
      });
      console.log("tableros:", this.tableros)
    })
    //Get vault charts
    this.chartsService.getVaultCharts().subscribe((charts: any) => {
      this.chartsService.getConfigByIds(this.idsTableros).subscribe((config: any) => {
        for (let [i, item] of charts.entries()){
          this.idsBoveda.push(item.id)
          this.boveda.push(
            {
              id: item.id,
              indicator: item.indicator,
              system: item.system,
              title: item.title,
              description: item.description,
              setings: false,
              chartType: item.chartType,
              row: config[i].row,
              column: config[i].column,
              data: item.data
            }
          )
        }
        
      })
    })
  }

  applyFilters(filters: { [key: string]: any }) {
    this.tableros = this.tableros.map(item => {
      if (filters['fecha']) {
        item.data.data = item.data.data.filter(d => d.date === filters['fecha']);
      }
      if (filters['categoria']) {
        item.data.data = item.data.data.filter(d => d.category === filters['categoria']);
      }
      return item;
    });
  }

  drop(event: CdkDragDrop<number,any>) {
    const fromId = event.previousContainer.data
    const toId = event.container.data

    const fromTablerosIndex = this.searchIndexTableros(fromId)
    const fromBovedaIndex = this.searchIndexBoveda(fromId)
    const toTablerosIndex = this.searchIndexTableros(toId)
    const toBovedaIndex = this.searchIndexBoveda(toId)

    const isFromTableros = fromTablerosIndex !== -1
    const isToTableros = toTablerosIndex !== -1

    if (isFromTableros !== isToTableros) {
      const sourceArray = isFromTableros ? this.tableros : this.boveda
      const targetArray = isToTableros ? this.tableros : this.boveda
      const sourceIndex = isFromTableros ? fromTablerosIndex : fromBovedaIndex

      const [item] = sourceArray.splice(sourceIndex, 1)
      targetArray.splice(event.currentIndex, 0, item)

      const sourceId = isFromTableros ? this.idsTableros : this.idsBoveda
      const targetId = isToTableros ? this.idsTableros : this.idsBoveda
      
      const [itemId] = sourceId.splice(sourceIndex, 1)
      targetId.splice(event.currentIndex, 0, itemId)
    } 
    else {
      const array = isFromTableros ? this.tableros : this.boveda
      const arrayIds = isFromTableros ? this.idsTableros : this.idsBoveda
      const fromIndex = isFromTableros ? fromTablerosIndex : fromBovedaIndex
      const toIndex = isFromTableros ? toTablerosIndex : toBovedaIndex

      if (fromIndex !== toIndex) {
        const elem1 = array[fromIndex]
        const elem2 = array[toIndex]
        array[fromIndex] = elem2
        array[toIndex] = elem1
        
        const id1 = arrayIds[fromIndex]
        const id2 = arrayIds[toIndex]
        arrayIds[fromIndex] = id2
        arrayIds[toIndex] = id1
      }
    }
    this.chartsService.postChartsIds(this.idsTableros).subscribe((response) => {
    })
  }

  cambiarEstadoConfiguracion(id: number){
    const index = this.searchIndexTableros(id)
    this.tableros[index].setings = !this.tableros[index].setings
  }

  
  cambiarDimensiones(id: number) {
    const index = this.searchIndexTableros(id)
    const config = {
      id: id,
      row: this.tableros[index].row,
      column: this.tableros[index].column
    }
    this.chartsService.postConfig(config).subscribe((response) => {
    })
  }

  private updateWidth(): void {
    this.gridWith = this.targetElement.nativeElement.offsetWidth
  }

  
  changeWidth(newWidth: string): void {
    this.targetElement.nativeElement.style.width = newWidth
  }

  eliminarElemento(id: number){
    const index = this.searchIndexTableros(id)
    const elemento = this.tableros[index]
    if (index !== -1) {
      this.boveda.push(elemento)
      this.idsBoveda.push(id)
      this.tableros.splice(index, 1)
      this.idsTableros.splice(index, 1)
    }
    this.chartsService.postChartsIds(this.idsTableros).subscribe((response) => {})
  }

  agregarBoveda(event: CdkDragDrop<any>){
    const item = event.item.data;
    this.eliminarElemento(item.id)
    this.chartsService.postChartsIds(this.idsTableros).subscribe((response) => {})
  }

  agregarATablero(event: CdkDragDrop<any>){
    const item = event.item.data;  
    const index = this.searchIndexBoveda(item.id)
    const elemento = this.boveda[index]
    if (index !== -1) {
      this.tableros.push(elemento)
      this.idsTableros.push(item.id)
      this.boveda.splice(index, 1)
      this.idsBoveda.splice(index, 1)
    }
    this.chartsService.postChartsIds(this.idsTableros).subscribe((response) => {})
  }

  cambiarEstado() {
    this.barraIzquierda = !this.barraIzquierda
  }

  editarTamanio(){
    this.editar = !this.editar
  }

  bloqMovimiento(){
    this.mover = !this.mover
  }

  cambiarModoOscuro() {
    this.modoOscuro = !this.modoOscuro
    document.body.classList.toggle("dark-mode", this.modoOscuro)
  }

  getCurrentMode(): string {
    return this.modoOscuro ? "dark" : "light"
  }

  searchIndexTableros(id:number){
    return this.tableros.findIndex((item) => item.id === id)
  }

  searchIndexBoveda(id:number){
    return this.boveda.findIndex((item) => item.id === id)
  }
}

