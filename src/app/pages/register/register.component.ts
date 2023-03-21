import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QueriesService } from 'src/app/services/queries.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  registroForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private router: Router, private httpClient: HttpClient, private Queries: QueriesService) { }

  async ngOnInit() {
  }

    return(){
      this.router.navigate(['']);
    }

    async createUser(form: any){    
      try {
        
          const res = this.Queries.createUser(form).then((query: any) => {
            if(query.ok){
              alert('Usuario registrado con exito: ' + form.username + '. Inicie sesión ' + form.fullname + '.');
            }else{
              console.log('Hubo un problema creando el usuario');
            }
          });

      } catch (error) {
        console.log(error);
      }
    }

}
