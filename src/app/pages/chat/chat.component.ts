import { Component, OnInit } from '@angular/core';
import { QueriesService } from 'src/app/services/queries.service';
import { HttpClient } from '@angular/common/http';
import { io } from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  emisor: any = localStorage.getItem('ID');
  receptor: any = localStorage.getItem('otroUser');
  currentUserName: any = localStorage.getItem('name');
  otroUsername: any = localStorage.getItem('otroUserName');
  


  newMsg = '';
  conversations: any;
  stado: any;
  
  public menzage: any;
  public contact: any;

  
  socket = io('http://localhost:3000/');


  constructor(private Queries: QueriesService, private httpClient: HttpClient) {
    
  }

  ngOnInit() {
    this.getMessages();
    this.socket.on('enviarmensaje', (data) => {
      console.log('Mensaje recibido: ', data.mensaje);
      this.conversations.push(data);
    });
  }

  messages = [
    {
      user: this.otroUsername,
      createdAt: 1554090856000,
      msg: 'Hey, que pedo?'
    },
    {
      user: this.currentUserName,
      createdAt: 1554090956000,
      msg: 'Haciendo mi chat en Ionic, y tu?'
    },
    {
      user: this.otroUsername,
      createdAt: 1554091056000,
      msg: 'Suerte con eso'
    },
    {
      user: this.otroUsername,
      createdAt: 1574091056000,
      msg: 'Hola hijo, ¿ya te llegó la beca?'
    }
  ];


  //@ViewChild (IonContent) content: IonContent;


  

    
    // setTimeout(() => {
    // this.content.scrollToBottom(200);
    // });

  getMessages() {
    try {
      const data = {}
      const resP = this.Queries.getConversation(data).then((query: any) => {
        if (query.ok) {
          console.log(query.data);
          this.conversations = query.data;
        } else {
          console.log('Hubo un problema obteniendo los usuarios');
        }
      });
    } catch (error) {
      console.log(error);
      console.log('Hubo un problema obteniendo usuarios.');
    }
  }

  regresar(){
    localStorage.removeItem('otroUser');
    localStorage.removeItem('otroUserName');
  }

  enviarMensajeBD(emizor: Number, rezeptor: Number, mensage: String, ){
    try {
      const data = {
        emisor: emizor,
        receptor: rezeptor,
        mensaje: mensage
      }
      const res = this.Queries.sendMessage(data).then((query: any) => {
        if (query.ok) {
          this.menzage = query.data;
          console.log(query.data);
          this.socket.emit('message', this.menzage);
          this.conversations.push(this.menzage);
          this.newMsg = '';
        } else {
          console.log('Problema al enviar mesnnsjae');
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  

}
