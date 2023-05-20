import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorageService } from 'src/app/services/app-storage.service';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  name!: string

  value: any="";
  res: any="";
  accessToken: any="";
  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private appStorageService: AppStorageService,
    private users: LoginPage
    ) {}


    ngOnInit() {
      // this.exibirNomeDoUsuario().then(name => {
      //   this.name = name
      // })
    }
  
  ativarTodososDados(){
    this.exibirNomeDoUsuario()
    this.exibirCPFDoUsuario()
    this.exibirEmailDoUsuario()
    this.exibirTokenDoUsuario()
  }
    

    async exibirTokenDoUsuario(){
      this.value = await this.appStorageService.get(`token`)
    }

    async exibirNomeDoUsuario(){
      this.name = await this.appStorageService.get(`name`)
    }

    async removerNome(){
      await this.appStorageService.remove('name')
    }

    async exibirEmailDoUsuario(){
      this.value = await this.appStorageService.get(`email`)
    }

    async exibirCPFDoUsuario(){
      this.value = await this.appStorageService.get(`cpfCnpj`)
    }

    async setToken(res: any, accessToken:any) {
      await this.users.setToken(res)
      //await this.appStorageService.set('token', `${accessToken}`)
    }

    ///////////////////////

    async setValue() {
      await this.appStorageService.set('testando', '123')
    }

   
  
    async getValue() {
      this.value = await this.appStorageService.get('testando')
    }
  
    async removeValue(){
      await this.appStorageService.remove('testando')
    }
  
    async clearStorage(){
      await this.appStorageService.clear()
    }

  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}




  // @Input() mechanics!: Mechanic[];
}

// interface Mechanic {
//   id: number;
//   name: string;
//   photoUrl: string;
//   specialties: string[];
// }

