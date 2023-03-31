import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  socket = io("http://localhost:3000");
  user = localStorage.getItem('ID');

  constructor() {this.socket}

  socketOnlineEmit(){
    this.socket.emit('login', (user: any) => {
      console.log(user + ' se ha conectado.');
     });
  }

  socketOnlineOn(){
    this.socket.on('loged', (data) => {
      console.log('Usuarios conectados actualizados: ' + data);      
    });
  }

}
