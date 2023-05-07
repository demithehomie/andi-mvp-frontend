import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  cadastroForm!: FormGroup;

  constructor(
      private formBuilder: FormBuilder, 
      private usersService: UsersService,
      private navCtrl: NavController
      ) { }


  user: User = {
    
    id: '',
    name: "",
    email: "",
    phone: '',
    cpfCnpj: '',
    password: ''
  }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      cpfCnpj: ['', Validators.required]
    });
  }

  onSubmit() {
    const usuario = this.cadastroForm.value;
    this.usersService.cadastrarUsuario(usuario).subscribe(response => {
      console.log('Usuário cadastrado com sucesso!', response);
      this.navCtrl.navigateForward('/dashboard')
    }, error => {
      console.error('Erro ao cadastrar usuário!', error);
    });
  
    // console.log(this.cadastroForm.value);
  }

}
