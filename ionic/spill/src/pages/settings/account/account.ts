//Author: Jannik Renner

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.alertCtrl = alertCtrl;

    this.user = navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  showChangePasswordAlert() {
    const prompt = this.alertCtrl.create({
      title: 'Change Password',
      message: "Enter old password and confirm new one!",
      inputs: [
        {
          type: 'password',
          name: 'Old Password',
          placeholder: 'old password'
        },
        {
          type: 'password',
          name:'New Password',
          placeholder: 'new password'
        },
        {
          type: 'password',
          name: 'Confirm Password',
          placeholder: 'new password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Save',
          handler: data => {
            var oldPassword = data["Old Password"];
            var newPassword = data["New Password"];
            var confirmPassword = data["Confirm Password"];

            if(newPassword != confirmPassword || oldPassword != this.user.password){
              this.showNewPasswordIncorrectAlert();
            }else{
              this.changePasswordAlert();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  showNewPasswordIncorrectAlert(){
    const alert = this.alertCtrl.create({
      title: 'Password could not be changed!',
      subTitle: "The old password was incorrect or the new one doesn' match",
      buttons: ['OK']
    });
    alert.present();
  }

  changePasswordAlert(){
    //Connect to server and try to change password

    //If success
    const alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: "Your password has been changed",
      buttons: ['OK']
    });
    alert.present();
  }
}
