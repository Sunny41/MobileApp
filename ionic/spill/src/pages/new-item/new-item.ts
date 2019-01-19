//Author: Sonja Czernotzky
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityPage } from '../activity/activity';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {
  activityMembers: any = [];
  checkedMembers: boolean[];
  group: any;
  user: any;
  activity: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.group = navParams.get('group');
    this.user = navParams.get('user');
    this.activity = navParams.get('activity');
    this.activityMembers = navParams.get('activityMembers');
    console.log('activityMembers');
    for(var i=0;i<this.activityMembers.length;i++){
      console.log(this.activityMembers[i]);
    }
    this.checkedMembers = new Array(this.activityMembers.length);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NewPostPage');
  }

  addNewAsset() {
    //store in db:
    // in items table:
    // {itemName, itemDescription, itemUserId, amount, itemActivityId}
    // for each member one entry in itemsInvited (checkedMembers):
    // {itemName, itemDescription, itemUserId, amount, itemInviteActivityId, itemInviteUserId, itemInviteInvitedUserid}

    this.navCtrl.push(ActivityPage, { activity: this.activity, user: this.user, group: this.group });
  }
}
