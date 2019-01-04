import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityPage } from '../activity/activity';
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
  member:string;
  activityMembers=[];
  checkedMembers:boolean[];
  assetMembers=[];
  group:any;
  user:any;
  activity:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.checkedMembers= new Array(this.activityMembers.length);
    this.group = navParams.get('group');
    this.user = navParams.get('user');
    this.activity = navParams.get('activity');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPostPage');
  }

  addNewAsset(){
    //store in db:
    // in items table:
    // {itemName, itemDescription, itemUserId, amount, itemActivityId}
    // for each member one entry in itemsInvited:
    // {itemName, itemDescription, itemUserId, amount, itemInviteActivityId, itemInviteUserId, itemInviteInvitedUserid}
    
   console.log(this.checkedMembers);
   this.navCtrl.push(ActivityPage, { activity:this.activity, user: this.user, group: this.group });
  }
}
