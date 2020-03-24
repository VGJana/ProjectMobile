import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})


export class TabsPage {

  constructor(private alertCtrl: AlertController, public router: Router,) {}


  async wrongPassword(){
    const alert = this.alertCtrl.create({
      header: 'Invalid password',
      subHeader: 'The password you entered was not correct',
      buttons: ['OK']
    });

    (await alert).present()
  }

  async validation(){
    let pwd = "Possie";
    let alert = this.alertCtrl.create({
      header: 'Login',
      inputs: [
        {
          name: 'password',
          placeholder: 'Password', 
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: data => {
            if (data.password ==pwd) {
              this.router.navigateByUrl('/tab3')
            } else {
              this.wrongPassword()
            }
          }
        }
      ]
    });
    (await alert).present()
  }
}
