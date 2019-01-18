//Author: Jannik Renner
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user:any;
  username : String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private http: HTTP) {
    this.user = navParams.data;
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  changeUsername(){
    const prompt = this.alertCtrl.create({
      title: 'Change Username',
      message: "Enter a new username!",
      inputs: [
        {
          type: 'text',
          name: 'username',
          placeholder: ''
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
             var username = data["username"];

            if(username == undefined || username == null || username == ''){
              const alert = this.alertCtrl.create({
                title: 'Username!',
                subTitle: 'The username cannot be empty!',
                buttons: ['OK']
              });
              this.changeUsername();
              alert.present();
            }else{
              this.updateUser(this.user.password, username);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  save(){
  }

  showChangePasswordAlert() {
    const prompt = this.alertCtrl.create({
      title: 'Change Password',
      message: "Enter old password and confirm new one!",
      inputs: [
        {
          type: 'password',
          name:'New Password',
          placeholder: 'new password'
        },
        {
          type: 'password',
          name: 'Confirm Password',
          placeholder: 'new password confirm'
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
            var newPassword = data["New Password"];
            var confirmPassword = data["Confirm Password"];

            if(newPassword != confirmPassword){
              this.showNewPasswordIncorrectAlert();
            }else{
              this.updateUser(newPassword, this.user.username);
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

  updateUser(newPassword, newUsername){
    //Connect to server and try to change password
    var url = 'https://spillapi.mybluemix.net/users/edit?mail=' + this.user.mail + '&username=' + newUsername + '&password=' + newPassword + '&userId=' + this.user.userId;
    this.http.put(url, {}, {}).then(data =>{
      var result:any = JSON.parse(data.data);
      if(result.status == 200){
        this.user.username = newUsername;
        //If success
        const alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: "Your profile has been changed",
          buttons: ['OK']
        });
        alert.present();
      }
    });

  }

}
