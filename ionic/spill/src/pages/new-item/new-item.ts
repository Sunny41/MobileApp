//Author: Sonja Czernotzky Tim Herold
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP, private alertCtrl: AlertController) {
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
    for(var i=0; i<this.activityMembers.length; i++){
      this.activityMembers[i].checked = false;
    }
    activityMember.checked = true;
  }

  addNewAsset() {
    //store in db:
    var activityMember:any;
    for(var i=0; i<this.activityMembers.length; i++){
      	if(this.activityMembers[i].checked){
          activityMember = this.activityMembers[i];
        }
    }
    
    if(this.itemName == '' || this.cost == 0 || activityMember == undefined || activityMember == null){
      this.simpleToast("Error", "Please fill in the name, cost and select a user.");
      return;
    }

    var url = 'https://spillapi.mybluemix.net/itemsinvited/new?itemName=' + this.itemName + '&itemDescription=' + this.itemDescription
    + '&amount=' + this.cost + '&itemInviteActivityId=' + this.activity.activityId + '&itemInviteUserId=' + this.user.userId + '&itemInviteInvitedUserId=' + activityMember.activityMembersUserId;
    this.http.post(url, {}, {}).then(data => {      
      if(data.status == 200){
        var result: any = JSON.parse(data.data);
        if(result.status == 200){

          const prompt = this.alertCtrl.create({
            title: 'Success',
            message: "The item has been created successfully",
            buttons: [
              {
                text: 'OK',
                handler: data => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          prompt.present();

        }
        else{
          alert("Something went wrong.");
        }
      }else{
        alert("something went wrong with adding members to the Acticity. please try again!")
      }
    });
  }
      
  simpleToast(title, message){
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
