import {
  Component,
  type OnInit,
} from "@angular/core"
import { CommonModule } from "@angular/common"

import { FormsModule } from '@angular/forms';
import "gridstack/dist/gridstack.min.css"
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDragPlaceholder, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop"
import { HighchartsDinamicoComponent } from "../highcharts-dinamico/highcharts-dinamico.component";
import { GaugeChartComponent } from "../gauge-chart/gauge-chart.component";
import { GaugeLinearComponent } from "../gauge-linear/gauge-linear.component";
import { FiltersService } from "../filtros/filters.service";
import { FilterPanelComponent } from "../filtros/filter-panel/filter-panel.component";
import { ChartsService } from "../charts/charts.service";
import { provideHttpClient } from "@angular/common/http";
import { AppModule } from "../app.module";


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
  disabled?: boolean

  data: {data:any[], units:string}
}

@Component({
  selector: "app-lista-tableros3",
  templateUrl: "./listaTableros3.component.html",
  styleUrls: ["./listaTableros3.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    FormsModule,
    HighchartsDinamicoComponent,
    GaugeChartComponent,
    GaugeLinearComponent,
    FilterPanelComponent
  ]
})
export class ListaTableros3Component implements OnInit {
  editar:boolean = false;
  mover:boolean = false;
  modoOscuro:boolean = false;
  barraIzquierda = false;


  boveda: ChartItem[] = [
    
    {
      id: 10,
      indicator:"Eficiencia",
      system:"Gestion de Transporte",
      title: "Reporte de Flota",
      description: "Descripcion",
      setings: false,
      chartType: 'line',
      row: 1,
      column: 1,
      data: {data:[{
        name: '2023',
        data: [5, 3, 4, 7]
    }, {
        name: '2024',
        data: [2, 2, 3, 2]
    }],
      units: 'Eficiencia'
  }
    }   
  ]
  tableros: ChartItem[] = [
    
  ]

  constructor(
    private filtersService: FiltersService,
    private chartsService: ChartsService
  ) {}

  ngOnInit() {
    this.filtersService.filters$.subscribe(filters => {
      this.applyFilters(filters);
    });
    this.chartsService.getCharts().subscribe((data: any) => {
      for (let item of data) {
        this.tableros.push(
          {
            id: item.id,
            indicator: item.indicator,
            system: item.system,
            title: item.title,
            description: item.description,
            setings: false,
            chartType: item.chartType,
            row: 2,
            column: 2,
            data: {
              data: item.data.data,
              units: item.data.units
            }
          }
        )
      }
      });
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
      const targetIndex = isToTableros ? toTablerosIndex : toBovedaIndex

      const [item] = sourceArray.splice(sourceIndex, 1)
      targetArray.splice(event.currentIndex, 0, item)
    } 
    else {
      const array = isFromTableros ? this.tableros : this.boveda
      const fromIndex = isFromTableros ? fromTablerosIndex : fromBovedaIndex
      const toIndex = isFromTableros ? toTablerosIndex : toBovedaIndex

      if (fromIndex !== toIndex) {
        const elem1 = array[fromIndex]
        const elem2 = array[toIndex]
        array[fromIndex] = elem2
        array[toIndex] = elem1
      }
    }
  }

  cambiarEstadoConfiguracion(id: number){
    const index = this.searchIndexTableros(id)
    this.tableros[index].setings = !this.tableros[index].setings
  }

  cambiarAltura(id: number, altura: number) {
    const index = this.searchIndexTableros(id)
    if (index !== -1) {
      this.tableros[index].row = altura
    }
  }

  cambiarAncho(id: number, ancho: number) {
    const index = this.searchIndexTableros(id)
    if (index !== -1) {
      this.tableros[index].column = ancho
    }
  }

  onChartTypeChange(event: any, id:number) {
    const currentChartType = event.target.value;
    const index = this.searchIndexTableros(id)
    if (index !== -1) {
      this.tableros[index].chartType = currentChartType
    }
  }

  eliminarElemento(id: number){
    const index = this.searchIndexTableros(id)
    const elemento = this.tableros[index]
    if (index !== -1) {
      this.boveda.push(elemento)
      this.tableros.splice(index, 1)
    }
  }

  agregarBoveda(event: CdkDragDrop<any>){
    const item = event.item.data;
    this.eliminarElemento(item.id)
  }

  agregarATablero(event: CdkDragDrop<any>){
    const item = event.item.data;  
    const index = this.searchIndexBoveda(item.id)
    const elemento = this.boveda[index]
    if (index !== -1) {
      this.tableros.push(elemento)
      this.boveda.splice(index, 1)
    }
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

