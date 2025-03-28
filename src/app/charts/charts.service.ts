import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  apiUrl = environment.url

  constructor(private http: HttpClient) {
  }

  getCharts() {
    return this.http.get(this.apiUrl + '/charts-data')
  }

}
