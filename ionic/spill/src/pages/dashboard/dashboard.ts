import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import {NewGroupPage} from '../new-group/new-group';
import { GroupPage } from '../group/group';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  GROUPS =  [
    {id:1, name:"Shooters", description:"Meeting at shooter Rt at 20:00"},
    {id:2, name:"Cinema", description:"With Mike and Ellie"},
    {id:3, name:"Trip to Berlin", description:"Don't forget to create activities"},
  ];

  constructor(public navCtrl: NavController) {
    this.navCtrl = navCtrl;
  }

  openSettings(){
    this.navCtrl.push(SettingsPage);
  }

  openNewGroup(){
    this.navCtrl.push(NewGroupPage);
  }

  openSelectedGroup(group){
    this.navCtrl.push(GroupPage, {data:group})
  }
}