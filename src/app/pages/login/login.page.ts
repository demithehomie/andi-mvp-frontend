import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

//

export class LoginPage implements OnInit {
  credentials!: FormGroup;

  loginForm: any;

 // email!: string;
 // password!: string;
  token!: string;

constructor(
  private formBuilder: FormBuilder, 
 
  private navCtrl: NavController,
  private loadingController: LoadingController,
  private authService: AuthenticationService,
		private alertController: AlertController,
		private router: Router,

  ) {}

ngOnInit() {
  this.credentials = this.formBuilder.group({
    email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
    password: ['cityslicka', [Validators.required, Validators.minLength(6)]]
  });
}

onSubmit() {
  // const { email, password } = this.loginForm.value;
  // this.authService.login(email, password).subscribe(response => {
  //   console.log('Login efetuado com sucesso!', response);
  //   this.authService.setToken(response.token);
  //   this.navCtrl.navigateForward('/dashboard');
  // }, error => {
  //   console.error('Erro ao efetuar login!', error);
  //   // Exibir mensagem de erro
  // });
}


async login() {
  const loading = await this.loadingController.create();
  await loading.present();

  this.authService.login(this.credentials.value).subscribe(
    async (res) => {
      await loading.dismiss();
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    },
    async (res) => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Login failed',
        message: res.error.error,
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



