import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  userdata:BehaviorSubject<any> =new BehaviorSubject(null);
  sendRegistertoApi(data: object): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }

  sendLogintoApi(data: object): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }

  saveData(){


    this.userdata.next( jwtDecode(JSON.stringify(localStorage.getItem('token'))));
  }
}
