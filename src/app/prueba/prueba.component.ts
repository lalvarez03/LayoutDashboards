import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  usuario:string = '';
  password:string = '';

  constructor() { }

  ngOnInit() {
  }

  generarPassword(){
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  login(){
    const user = {username: this.usuario, password: this.password};
    const user2 = {username: 'admin', password: 'admin'};
    if(this.usuario === 'admin' && this.password === 'admin'){
      alert('bienvenido');
    }else{
      alert('usuario o contraseña incorrecto');
    }
  }
}
