//Author: Sonja Czernotzky, Hanna Schulze

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityPage } from './../activity/activity';
import { HTTP } from '@ionic-native/http';


@Component({
  selector: 'page-new-activity',
  templateUrl: 'new-activity.html',
})
export class NewActivityPage {
  name: String = "";
  description: String = "";
  date: Date;
  time: Date;
  place: String = "";
  
  group: any;
  user: any;
  membersToAdd: any = [];
  groupMembers: any = [];
  checkedMembers: boolean[];
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP) {
    this.group = navParams.get('group');
    this.user = navParams.get('user');
    this.groupMembers = navParams.get('groupMembers');
    this.checkedMembers = new Array(this.groupMembers.length);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NewActivityPage');
  }

  addActivity() {
    // store in db:
    // in activity table:
    // {name, description, date, place, activityAdminId}
    var datetime = this.date+' '+ this.time;
    console.log("DateTime: " + datetime);
    console.log("ActivityGroupId: " + this.group.groupId)
    
    var url = 'https://spillapi.mybluemix.net/activities/new?name=' + this.name + '&description=' + this.description + '&date=' + datetime + '&place=' + this.place + '&activityAdminId=' + this.user.userId + '&activityGroupId=' + this.group.groupId;
    this.http.post(url, {}, {}).then(data=>{
      var result: any = JSON.parse(data.data);
      console.log("status " + data.status);
      if(data.status == 200){
        console.log("data " + data.data); 
        var activity: any = result.response[0];
        this.navCtrl.push(ActivityPage, {group: this.group,  user: this.user, activity: activity });
        
        // for each member one entry in itemsInvited:
        // {activityMembersActivityId, activityMembersUserId}
        this.membersToAdd.forEach((member: any) => {
          var url = 'https://spillapi.mybluemix.net/activitymembers/new?activityMembersActivityId='+ activity.activityId + '&activityMembersUserId=' + member.userId;
          this.http.post(url, {},{}).then(data=>{
            var result: any = JSON.parse(data.data);
            console.log("status " + data.status);
            if(data.status == 200){
              console.log("data " + data.data);

            }else{
              alert("something went wrong with adding members to the Acticity. please try again!")
            }
          });
        });
      } else{
        alert("something went wrong with creating the Acticity. please try again!")
      }
    });
  }
}
