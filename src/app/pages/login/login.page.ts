import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {


  loginForm: any;

  email!: string;
  password!: string;
  token!: string;

constructor(
  private formBuilder: FormBuilder, 
  private authService: AuthService,
  private navCtrl: NavController
  ) {}

ngOnInit() {
  this.loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
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


login(){
  this.authService.login('seu-token-jwt-aqui');
    this.navCtrl.navigateForward('/home');
   // this.navCtrl.navigateForward('/dashboard');
  };
}




