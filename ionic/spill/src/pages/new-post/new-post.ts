import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {
  member:string;
  activityMembers=[];
  checkedMembers:boolean[];
  assetMembers=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.checkedMembers= new Array(this.activityMembers.length);
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
   this.navCtrl.pop();
  }
}
