import { Component, Injectable, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/user.service';
import { AppStorageService } from 'src/app/services/app-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

//
@Injectable()
export class LoginPage implements OnInit {
  credentials!: FormGroup;

  loginForm: any;

 // email!: string;
 // password!: string;
  token!: string;

constructor(
  private formBuilder: FormBuilder, 
  private usersService: UsersService,
  private appStorageService: AppStorageService,
  private navCtrl: NavController,
  private loadingController: LoadingController,
  private authService: AuthenticationService,
		private alertController: AlertController,
		private router: Router,

  ) {}

ngOnInit() {
  this.credentials = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

setToken(token: any){
  this.appStorageService.set(`token`,`${token}`)
}

setUsername(name: any){
  this.appStorageService.set(`name`,`${name}`)
}

setEmail(email: any){
  this.appStorageService.set(`email`,`${email}`)
}

setCPF(cpfCnpj: any){
  this.appStorageService.set(`cpfCnpj`,`${cpfCnpj}`)
}

async login() {
  const accessToken = ""
  const loading = await this.loadingController.create();
  await loading.present();

  this.usersService.loginSimples(this.credentials.value).subscribe(
    
    async (res: any) => {
     this.setToken(res.token.accessToken)
     this.setUsername(res.name)
     this.setEmail(res.email)
     this.setCPF(res.cpfCnpj)
      console.log(res)
      await loading.dismiss();
      console.log(this.credentials.value)
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      
    },
    async (res: { error: any; }) => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Login failed',
        message: res.error,
        buttons: ['OK']
      });

      await alert.present();
    }
  );
}

// Easy access for form fields
get email() {
  return this.credentials.get('email');
}

get password() {
  return this.credentials.get('password');
}
}



