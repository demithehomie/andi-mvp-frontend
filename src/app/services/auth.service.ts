  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/loginresponse';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {


    private token!: string;
    
    constructor(
      private http: HttpClient, 
      private navCtrl: NavController, 
      private storage: Storage,
      private platform: Platform
      ) { 
        
        this.platform.ready().then(() => {
        this.storage = new Storage({
          name: '_mydb',
          driverOrder: ['indexeddb', 'postgresql', 'websql']
        });
        this.storage.create().then(() => {
          this.storage.get('accessToken').then((token) => {
            this.token = token;
          });
        });
      });
       }

    

    backendUrl = "http://localhost:3000"

    login(email: string, password: string): Observable<LoginResponse> {
      const body = { email, password };
      return this.http.post<LoginResponse>(`${this.backendUrl}/auth/login`, body);
    }
    

    setToken(token: string) {
      this.storage.set('accessToken', token);
      this.token = token;
    }
    

    getToken() {
      return this.storage.get('accessToken');
    }
    

    isAuthenticated() {
      return !!this.storage.get('accessToken');
    }
    

    logout(): void {
      this.storage.remove('accessToken');
      this.token = '';
      this.navCtrl.navigateForward('/login')
    }
    
    getUserById(id: number ){
      return this.http.get(this.backendUrl+'/users/'+id)
    }

  }//
