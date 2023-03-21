import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from '../tab2/tab2.page';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChatComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    PagesRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Tab2Page
  ]
})
export class PagesModule { }
