import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  public url: string;

  constructor(private httpClient : HttpClient) {
    this.url = environment.API_URL;
  }

   async createUser(data: any){
    const req: any = await this.httpClient.post(this.url + '/user_create', data).toPromise();
    return req;
   }

   async getPerfil(idPersona: any){
    const req: any = await this.httpClient.post(this.url + '/find_user', idPersona).toPromise();
    return req;
   }

   async updName(data: any){
    const req: any = await this.httpClient.post(this.url+'/user_update', data).toPromise();
    return req;
   }

   async updUsername(data: any){
    const req: any = await this.httpClient.post(this.url+'/username_update', data).toPromise();
    return req;
   }

   async updPassword(data: any){
    const req: any = await this.httpClient.post(this.url+'/password_update', data).toPromise();
    return req;
   }

   async allUsers(data: any){
    const req: any = await this.httpClient.post(this.url + '/find_userAll', data).toPromise();
    return req;
   }

   async getID(data: any){
    const req: any = await this.httpClient.post(this.url + '/find_user', data).toPromise();
    return req;
   }

   async getConversation(data: any){
    const req: any = await this.httpClient.post(this.url + '/all_messages', data).toPromise();
    return req;
   }

   async status(data: any){
    const req: any = await this.httpClient.post(this.url + '/status', data).toPromise();
    return req;
   }

   async sendMessage(data: any){
    const req: any = await this.httpClient.post(this.url + '/newMessage', data).toPromise();
    return req;
   }
}
