import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class HighchartsService {
  public updateChartOptions(chartType: string, title: string, isDarkMode: boolean, categories: string[], data:any, units: string): Highcharts.Options {
    const bg = isDarkMode ? "#333" : "#FFF";
    const bg2 = isDarkMode ? "#444" : "#d1d1d1";
    const coloresDefinidos = isDarkMode ? 
    ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF", "#6D8B74", "#E57373", "#81C784"]: 
    ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40","#C9CBCF","#6D8B74","#E57373","#81C784",];
    const colorDefinido = isDarkMode ? "#FFF" : "#000";
    const textSecondary = isDarkMode ? "#CCC" : "#666";

    const baseOptions: Highcharts.Options = {
      chart: {
        type: chartType as any,
        backgroundColor: bg,
      },
      title: {
        text: title,
        margin: 1,
        minScale: 0.2,
        verticalAlign: 'top',
        style: { color: colorDefinido },
      },
      colors:coloresDefinidos,
      xAxis: {
        title: { text: null, style: { color: colorDefinido } },
        labels: { overflow: 'justify', style: { color: colorDefinido } },
        categories: categories
      },
      yAxis: {
        min: 0,
        title: { text: units, align: 'high', style: { color: colorDefinido } },
        labels: { overflow: 'justify', style: { color: colorDefinido } },
        plotLines: [{
          value: 5,
          color: 'red',
          width: 2,
          zIndex: 5,
        },{
          value: 2,
          color: 'blue',
          width: 2,
          zIndex: 5,
      }
      ]
      },
      legend: {
        itemStyle: { color: colorDefinido },
        itemHoverStyle: { color: colorDefinido },
      },
      plotOptions: {
        series: {
          events: {
            click: (event) => {
              console.log(event.point)
            },
          },
        },
        column: {
          stacking: chartType === "column" ? "percent" : undefined,
        }
      },
      series: [{
        type: chartType as any,
        name: title,
        data: data
      }]
    };
    
    return baseOptions;
  }
}
