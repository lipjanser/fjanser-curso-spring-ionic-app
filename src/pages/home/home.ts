import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { LoadingService } from '../../services/loading.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService, public alert: ToastService, public loading: LoadingService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login() {
    this.loading.show();
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
        this.loading.hide();
      },error => {
        this.alert.presentToast(`${error.status} - ${error.error}:  ${error.message}`);
        this.loading.hide();
      });
  }

  register() {
    
  }

}
