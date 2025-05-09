import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface TableColumn {
  name: string;
  data: any[];
}

interface TableData {
  data: TableColumn[];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TableComponent implements OnInit {
  @Input() tableData: TableData | null = null;
  @Input() height!: number;
  @Input() width!: number;
  rowIndexes: number[] = [];
  
  constructor() {}

  ngOnInit() {
    if (this.tableData && this.tableData.data.length > 0) {
      this.rowIndexes = this.tableData.data[0].data.map((_, i) => i);
    }
  }

  getTextSize(): number {
    let  size = Math.min(this.width, this.height) / 20
    if (size < 10) {
      size = 10;
    }
    if (size > 17) {
      size = 17;
    }
    return size
  }
}
