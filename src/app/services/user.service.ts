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

  loginSimples(credentials: { email: any; password: any }){
    return this.http.post(this.backendUrl+'/auth/login', credentials)
    //console.log(Response)
  }

  obterESalvarToken(){
    
  }

  obterUsuarioPorEmail(email: string){
    return this.http.get(this.backendUrl+'/users/email/'+email); 
  }
}
