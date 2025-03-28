import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    RouterOutlet
  ],
})
export class AppComponent {
  title = 'tableroMando';

  constructor(private router: Router){}


  irATableros1(){
    this.router.navigate(['tableros1'])
  }

  irATableros2(){
    this.router.navigate(['tableros2'])
  }
  irATableros3(){
    this.router.navigate(['tableros3'])
  }
}
