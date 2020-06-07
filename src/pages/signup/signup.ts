import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        nome: ['Felipe Teste', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['lipjanser@outlook.com.br', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpfOuCnpj: ['66772869087', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['1', [Validators.required]],
        cep : ['10828333', [Validators.required]],
        logradouro : ['Rua Via', [Validators.required]],
        numero : ['25', [Validators.required]],
        complemento : ['Casa'],
        bairro : ['Copacabana'],
        telefone1 : ['977261827', [Validators.required]],
        telefone2 : [''],
        telefone3 : [''],
        estadoId : [null, [Validators.required]],
        cidadeId : [null, [Validators.required]] 
      });
  }

  signupUser() {

  }

}
