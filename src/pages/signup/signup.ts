import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {
      this.formGroup = this.formBuilder.group({
        nome: ['Felipe Teste', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['lipjanser@outlook.com.br', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpf_cnpj: ['66772869087', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
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

  ionViewDidLoad() {
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    }, error => {

    });
  }
  updateCidades() {
    let estadoId = this.formGroup.value.estadoId
    this.cidadeService.findAll(estadoId)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    }, error => {
      
    });
  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOK();
      },
      error => {

      });
  }

  showInsertOK() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      message: 'Client saved successfully.',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
