import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'bienvenido a angular';
  curso: string = 'Curso spring 5 con angular 7';
  alumno: string = 'Gabriele Nevini';
}
