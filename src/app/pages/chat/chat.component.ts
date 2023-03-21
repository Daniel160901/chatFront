import { Component, OnInit } from '@angular/core';
import { QueriesService } from 'src/app/services/queries.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  emisor: any = localStorage.getItem('ID')?.toString();
  receptor: any = localStorage.getItem('otroUser');
  currentUserName: any = localStorage.getItem('name');
  otroUsername: any = localStorage.getItem('otroUserName');

  newMsg = '';
  conversations: any;
  stado: any;

  mio: Number= 1;
  suyo: any= 0;
  
  public menzage: any;
  public contact: any;


  constructor(private Queries: QueriesService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.getMessages();
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


  enviarMensaje() {
    this.messages.push({
      user: this.currentUserName,
      createdAt: new Date().getTime(),
      msg: this.newMsg
    });

    this.newMsg = '';
    // setTimeout(() => {
    // this.content.scrollToBottom(200);
    // });
  }

  getMessages() {
    try {
      const data = {}
      const resP = this.Queries.getConversation(data).then((query: any) => {
        if (query.ok) {
          console.log(query.data);
          this.conversations = query.data;
          console.log('El current user tiene de ID el: ' + this.emisor);
          console.log(this.receptor);
          
          for (let i = 0; i < this.conversations.length; i++) {
            const element = this.conversations[i];
            if(this.emisor == element.emisor && this.receptor == element.receptor){
              console.log(element.emisor + ' ' + element.receptor);
            } else if(this.emisor == element.receptor && this.receptor == element.emisor){
              console.log(element.emisor + ' ' + element.receptor);
              } 
            
          }
          
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
          
        } else {
          console.log('Problema al enviar mesnnsjae');
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  }

}
