import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import {NewGroupPage} from '../new-group/new-group';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;
  }

  openSettings(){
    this.navCtrl.push(SettingsPage);
  }

  openNewGroup(){
    this.navCtrl.push(NewGroupPage);
  }
}