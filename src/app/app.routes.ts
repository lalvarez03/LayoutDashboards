import { Routes } from '@angular/router';
import { ListaTableros3Component } from './listaTableros3/listaTableros3.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { FilterPanelComponent } from './filtros/filter-panel/filter-panel.component';

export const routes: Routes = [
    { path: "filtros", component: FilterPanelComponent },
    { path: "", component: ListaTableros3Component },
  ]
