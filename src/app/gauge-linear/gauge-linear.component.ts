import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-gauge-linear',
  templateUrl: './gauge-linear.component.html',
  styleUrls: ['./gauge-linear.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class GaugeLinearComponent implements OnInit {
  @Input() value: number = 0;
  @Input() title: string = "";
  @Input() min: number = 0;
  @Input() max?: number;
  @Input() target?: number;
  @Input() isDarkMode: boolean = false;

  unidades: string = "USD";
  progress: number = 0;
  targetPosition: number = 0;

  ngOnInit() {
    this.calculateProgress();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.calculateProgress();
    }
  }

  calculateProgress() {
    if (this.max === undefined) return;

    const range = this.max - this.min;
    if (range <= 0) {
      this.progress = 0;
      this.targetPosition = 0;
      return;
    }

    this.progress = ((this.value - this.min) / range) * 100;
    this.targetPosition = ((this.target! - this.min) / range) * 100;
  }

  onSelect(event: any) {
    console.log(event)
  }

}