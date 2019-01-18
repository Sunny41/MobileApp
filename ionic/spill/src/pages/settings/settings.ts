//Author: Jannik Renner
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ProfilePage } from './profile/profile';
import { AppSettingsPage } from './app-settings/app-settings';
import { AccountPage } from './account/account';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  user:any;
  tab1Root = ProfilePage;
  tab3Root = AppSettingsPage;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.user = navParams["user"];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }


  goBack(){
    this.events.publish('save');
    this.navCtrl.pop();
  }
}
