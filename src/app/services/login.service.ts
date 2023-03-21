import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { QueriesService } from '../services/queries.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url: string;
  public body: any;

  constructor(private httpClient: HttpClient, private Queries: QueriesService) { 
    this.url = environment.API_URL;
  }

  cerrarSesion(){
    return false;
  }

  async login(data: any){
    const res: any = await this.httpClient.post(this.url + '/login', data).toPromise();
    const token = res.token;
    localStorage.setItem("token", token);
    this.getUsers();
    return res;
  }

  setToken(){
    return false;
  }

  async getUsers(){
    const response: any = await this.httpClient.post(this.url + '/find_userAll', this.body).toPromise();
    return response;
  }
}
