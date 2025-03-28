import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../filters.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.css'],
  standalone: true,
})
export class FilterPanelComponent {
  constructor(private filtersService: FiltersService) {}

  applyFilter(key: string, event: any) {
    this.filtersService.setFilter(key, event.target.value);
    console.log("Filtro aplicado:", key, event.target.value);
  }

  clearFilters() {
    this.filtersService.clearFilters();
  }
}