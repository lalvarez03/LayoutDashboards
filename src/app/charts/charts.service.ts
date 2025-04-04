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

  getVaultCharts() {
    return this.http.get(this.apiUrl + '/charts-data/vault')
  }
  getChartsByIds(ids: number[]){
    return this.http.post(this.apiUrl + '/charts-data/ids-data', ids )
  }

  postChartsIds (ids: number[]){
    return this.http.post(this.apiUrl + '/charts-data/ids', ids )
  }

  getConfigByIds(ids: number[]){
    return this.http.post(this.apiUrl + '/charts-config/ids', ids )
  }

  postConfig(config: any){
    console.log(config)
    return this.http.post(this.apiUrl + '/charts-configs', config)
  }
}
