//Author: Sonja Czernotzky Tim Herold
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityPage } from '../activity/activity';
//import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
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
  group: any;
  user: any;
  activity: any;
  itemName:string;
  itemDescription:string;
  cost:number;

  name: String;
  description: string;
  costs: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP) {
    this.group = navParams.get('group');
    this.user = navParams.get('user');
    this.activity = navParams.get('activity');
    var activityMemberObj:any = [] = navParams.get('activityMembers');
    for(var i=0; i<activityMemberObj.length; i++){
      if(this.user.userId != activityMemberObj[i].userId) {
        var json = {"userId":activityMemberObj[i].userId, "username":activityMemberObj[i].username, "checked":false};
        this.activityMembers.push(json);
      }     
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NewPostPage');
  }

  checkMember(activityMember){
    activityMember.checked = true;
  }

  addNewAsset() {
    //store in db:
    // in items table:
    // {itemName, itemDescription, itemUserId, amount, itemActivityId}
    var url = 'https://spillapi.mybluemix.net/items/new?itemName=' + this.name + '&itemDescription=' + this.description
    + '&itemUserId=' + this.user.userId + '&amount=' + this.costs + '&itemActivityId=' + this.activity.activityId ;
    this.http.post(url, {}, {}).then(data=>{
      var result: any = JSON.parse(data.data);
      console.log("status " + data.status);
      if(data.status == 200){
        alert(1)
        console.log("data " + data.data);
        var item: any = result.response[0];
        this.navCtrl.push(ActivityPage, { activity: this.activity, user: this.user, group: this.group, item: item });

    // for each member one entry in itemsInvited (checkedMembers):
    // {itemName, itemDescription, itemUserId, amount, itemInviteActivityId, itemInviteUserId, itemInviteInvitedUserid}
    for (var i = 0; i <= this.checkedMembers.length-1; i += 1) {
      if(this.checkedMembers[i]== true){
        var url = 'https://spillapi.mybluemix.net/itemsinvited/new?itemName=' + this.name + '&itemDescription=' + this.description
        + '&itemUserId=' + this.user.userId + '&amount=' + this.costs
        + '&itemInviteActivityId=' + this.activity.activityId + '&itemInviteUserId=' + this.user.userId + '&itemInviteInvitedUserid=' + this.activityMembers[i].userId;
        this.http.post(url, {},{}).then(data=>{
          var result: any = JSON.parse(data.data);
          console.log("status " + data.status);
          if(data.status == 200){
            console.log("data " + data.data);
          }else{
            alert("something went wrong with adding members to the Acticity. please try again!")
          }
        });
      }

    }

  }
});
}
}
