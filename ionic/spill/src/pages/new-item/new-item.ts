//Author: Sonja Czernotzky Tim Herold
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityPage } from '../activity/activity';
import { HTTP } from '@ionic-native/http';

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
   // for each member that is checked
    var json = {"userId":this.user.userId, "username":this.user.username, "checked":true};
    this.activityMembers.push(json);
    
    var checkedUser;
    for(var i=0; i<this.activityMembers.length; i++){
      	if(this.activityMembers[i].checked){
          checkedUser++;
        }
    }

    var amount = this.cost / checkedUser;

    //Change API function so that we only need one call
    for (var i = 0; i <= this.activityMembers.length-1; i += 1) {
      if(this.activityMembers[i].checked){
        var url = 'https://spillapi.mybluemix.net/itemsinvited/new?itemName=' + this.itemName + '&itemDescription=' + this.itemDescription
        + '&amount=' + amount + '&itemInviteActivityId=' + this.activity.activityId + '&itemInviteUserId=' + this.user.userId + '&itemInviteInvitedUserId=' + this.activityMembers[i].userId;
        this.http.post(url, {},{}).then(data=>{
          var result: any = JSON.parse(data.data);
          if(data.status == 200){
            
          }else{
            alert("something went wrong with adding members to the Acticity. please try again!")
          }
        });
        }
      }

    }
      
    
}
