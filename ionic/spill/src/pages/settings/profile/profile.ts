import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  username : String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public events: Events) {
    events.subscribe('save', () => {
      this.save();
    });
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
            this.username = data["username"];

            if(this.username == undefined || this.username == null || this.username == ''){
              const alert = this.alertCtrl.create({
                title: 'Username!',
                subTitle: 'The username cannot be empty!',
                buttons: ['OK']
              });
              this.changeUsername();
              alert.present();
            }else{
              console.log("Save new username to db! " + this.username);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  save(){
    console.log("Save profile to database");
  }

}
