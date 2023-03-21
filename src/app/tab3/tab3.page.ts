import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { QueriesService } from '../services/queries.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  result: any;
  public idPersona: any = localStorage.getItem('ID');
  
  public url: string;
  public queri: any;
  public name: any;
  public username: any;
  public ps1: any;
  public estado: any;
  public estatus: Number = 0;

  public nombre: any = localStorage.getItem('name');
  public nameUser: any = localStorage.getItem('nameUser');

  constructor(private actionSheetCtrl: ActionSheetController, private alertController: AlertController, private httpClient: HttpClient, private Queries: QueriesService, private router: Router) {
    this.url = environment.API_URL;
  }

  ngOnInit(): void {
    this.getPerfil(this.idPersona);
    console.log('El perfil que estas usando es el ID: ' + this.idPersona);
    
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Cambiar o eliminar foto de perfil',
      subHeader: '',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cambiar',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }
  async changeName() {
    const input = await this.alertController.create({
      header: 'Ingresa tu nuevo nombre',
      inputs: [
        {
          name: 'fullname',
          type: 'text',
          value: this.nombre
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Presionó Cancelar')
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.cambiarNombre(data.fullname, this.idPersona);
            console.log('Información guardada: ', data, this.idPersona);
          }
        }
      ]      
    });
    await input.present();
  }

  async changeUsername() {
    const alert = await this.alertController.create({
      header: 'Ingresa tu nuevo nombre de usuario',
      inputs: [
        {
          name: 'username',
          type: 'text',
          value: this.nameUser
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Presionó Cancelar')
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.cambiarUsername(data.username, this.idPersona);
            console.log('Información guardada: ', data, this.idPersona);
          }
        }
      ]      
    });
    await alert.present();
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Ingresa tu nueva contraseña',
      inputs: [
        {
          placeholder: 'Nueva contraseña',
          type: 'password',
          name: 'ps1'
        },
        {
          placeholder: 'Repite la contraseña',
          type: 'password',
          name: 'ps2'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Presionó Cancelar')
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if(data.ps1 === data.ps2){
              this.cambiarContraseña(this.idPersona, data.ps1);
              console.log('Contraseña actualizada');
            } else {
              console.log('Las contraseñas no coinciden');
            }
          }
        }
      ]
      
    });
    await alert.present();
  }

  async logout() {
    this.status(this.estatus, this.idPersona);
    localStorage.clear();
  }

  async getPerfil(idPersona: any) {
    try {
      const data = {
        condition: {
          idUsuario: idPersona
        }
      }
      const resP = this.Queries.getPerfil(data).then((query: any) => {
        if (query.ok) {
          console.log(query.data);
          this.queri = query.data;
        } else {
          console.log('Hubo un problema obteniendo el perfil');
        }
      });
    } catch (error) {
      console.log(error);
    }
    return this.idPersona;
  }

  async cambiarNombre(fullname: string, idPersona: Number) {
    try {
      const data = {
        fullname: fullname,
        idPersona: idPersona
      }
      const res = this.Queries.updName(data).then((query: any) => {
        if (query.ok) {
          console.log('Se actualizó el nombre a ', data.fullname);
          this.name = query.data;
        } else {
          console.log('Problema al actualizar nombre');
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  async cambiarUsername(username: string, idPersona: Number) {
    try {
      const data = {
        username: username,
        idPersona: idPersona
      }
      const res = this.Queries.updUsername(data).then((query: any) => {
        if (query.ok) {
          console.log('Se actualizó el username a ', data.username);
          this.username = query.data;
        } else {
          console.log('Problema al actualizar username');
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  async cambiarContraseña(idPersona: Number, ps1: String){
    try {
      const data = {
        ps1: ps1,
        idPersona: idPersona
      }
      const res = this.Queries.updPassword(data).then((query: any) => {
        if (query.ok) {
          console.log('Se actualizó la contraseña');
          console.log(data)
          this.ps1 = query.data;
        } else {
          console.log('Problema al actualizar contraseña');
        }
      });
    } catch (error: any) {
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
