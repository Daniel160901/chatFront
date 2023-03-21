import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JWTAuthService implements HttpInterceptor{

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Pasó por el interceptor.');

    const token = localStorage.getItem('token');
    
    const reqClone = req.clone({
      
    });

    return next.handle(reqClone).pipe(
      catchError(this.errores)
    );
  }

  errores(error: HttpErrorResponse){
    console.log('Sucedió un error en el query');
    console.warn(error);
    return throwError('Error personalizado');
  }
}