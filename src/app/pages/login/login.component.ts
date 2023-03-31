import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QueriesService } from 'src/app/services/queries.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formulario = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  public username: any;
  public estado: any;
  public estatus: Number = 1;


  constructor(private router: Router, private usser: LoginService, private httpClient: HttpClient, private Queries: QueriesService, private Socket: SocketService) { }

  async ngOnInit() {}

  async login(form: any) {
    await this.usser.login(form).then((data: any) => {
      if (data.ok) {
        this.getID(form);
        
        this.Socket.socketOnlineEmit();
        setTimeout("location.href='/tabs/tab1'", 500);
      } else {
        alert('Los datos no son correctos');
      }
    });
  }

  return() {
    this.router.navigate(['']);
  }

  async getID(form: any){
    try {
      const data = {
        condition: {
          username: form.username
        }
      }
      const resP = this.Queries.getID(data).then((query: any) => {
        if (query.ok) {
          console.log(query.data);
          this.username = query.data;
          localStorage.setItem("ID", query.data.idUsuario);
          localStorage.setItem("nameUser", query.data.username);
          localStorage.setItem("name", query.data.fullname);
          this.status(this.estatus, query.data.idUsuario);
        } else {
          console.log('Hubo un problema obteniendo el perfil');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async status(status: Number, idPersona: Number) {
    try {
      const data = {
        status: status,
        idPersona: idPersona
      }
      const res = this.Queries.status(data).then((query: any) => {
        if (query.ok) {
          this.estado = query.data;
        } else {
          console.log('Problema al poner en linea');
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  }
}
