import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

   backendUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  cadastrarUsuario(usuario: any) {
    return this.http.post(this.backendUrl+'/auth/register', usuario);
  }
}
