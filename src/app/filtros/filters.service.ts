import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private filters = new BehaviorSubject<{ [key: string]: any }>({});
  filters$ = this.filters.asObservable();

  setFilter(key: string, value: any) {
    const currentFilters = { ...this.filters.getValue() };
    currentFilters[key] = value;
    this.filters.next(currentFilters);
  }

  getFilters() {
    return this.filters.getValue();
  }

  clearFilters() {
    this.filters.next({});
  }
}
