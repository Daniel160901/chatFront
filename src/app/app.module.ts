import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTAuthService } from './interceptors/jwtauthservice';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PagesRoutingModule,
    PagesModule,
    HttpClientModule
  ],
  providers: [{
    provide: RouteReuseStrategy, useClass: IonicRouteStrategy
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JWTAuthService,
    multi: true
  }],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
