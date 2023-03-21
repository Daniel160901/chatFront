import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { QueriesService } from '../services/queries.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public users: any;
  public id: any;
  public usernamee: any;

  constructor(private httpClient: HttpClient, private Queries: QueriesService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  async getUsers(){
    try {
      const data = {}
      const resP = this.Queries.allUsers(data).then((query: any) => {
        if (query.ok) {
          console.log(query);
          this.users = query.data;
        } else {
          console.log('Hubo un problema obteniendo los usuarios');
        }
      });
    } catch (error) {
      console.log(error);
      console.log('Hubo un problema obteniendo usuarios.');
      
    }
  }

  async chateando(idd: Number, usernamee: String){
    this.id = idd;
    this.usernamee = usernamee;
    console.log(this.id);
    localStorage.setItem("otroUser", this.id);
    localStorage.setItem("otroUserName", this.usernamee);
  }
  

}
