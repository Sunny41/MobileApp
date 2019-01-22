//Author: Sonja Czernotzky, Hanna Schulze

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NewActivityPage } from '../new-activity/new-activity';
import { ActivityPage } from '../activity/activity';
import { AddMemberPage } from '../add-member/add-member';
import { HTTP } from '@ionic-native/http';


@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {
  
  refresher:any;
  user: any;
  activity: any = [];
  group: any;
  activities: any = [];
  activitymembers: any = [];
  groupactivities: any = [];
  groupMembers: any = [];
  groupMembersID: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP, public alertCtrl: AlertController) {
    if (navParams.get('group') != null) {
      //get ids from navparams
      this.group = navParams.get('group');
      this.user = navParams.get('user');
    }
  }


  ionViewWillEnter(){
    this.load();
  }

  doRefresh(refresher){
    this.refresher = refresher;
    this.load();
  }

  load(){
    //Load activities
    var url = 'https://spillapi.mybluemix.net/activities/group?s=' + this.group.groupId;
    this.http.get(url, {}, {}).then(data =>{
      var result:any = JSON.parse(data.data);
      if(data.status == 200){
        this.groupactivities = [];  
        this.activities = [];
        this.groupactivities = result.response;

        for (let i = 0; i < this.groupactivities.length; i++) {
          //get activities from id
          var url = 'https://spillapi.mybluemix.net/activities/id?s=' + this.groupactivities[i].activityId;
          this.http.get(url, {}, {}).then(data =>{
            var result:any = JSON.parse(data.data);
            if(data.status == 200){
              for (var j = 0; j < result.response.length; j++) {
                this.activities.push(result.response[j]);
              }
            }
          });
        }
        if(this.refresher != null && this.refresher != undefined){
          this.refresher.complete();
        }
      }
    });
    //load group members
    var url = 'https://spillapi.mybluemix.net/groupmembers/id?s=' + this.group.groupId;
    this.http.get(url, {}, {}).then(data =>{
      var result:any = JSON.parse(data.data);
      if(data.status == 200){
        if(result.status == 200){
          this.groupMembersID = [];
          this.groupMembers = [];
          this.groupMembersID = result.response;

          for (let i = 0; i < this.groupMembersID.length; i++) {
            //get members from id
            var url = 'https://spillapi.mybluemix.net/users/id?s=' + this.groupMembersID[i].userId;
            this.http.get(url, {}, {}).then(data =>{
              var result:any = JSON.parse(data.data);
              if(data.status == 200){
                if(result.status  == 200){
                  for (var j = 0; j < result.response.length; j++) {
                    this.groupMembers.push(result.response[j]);
                  }
                }
              }
            });
          }
        }
      }
    });
  }

  openAddActivity() {
    //@Hanna: already did that for u, bc i needed the params :)
    this.navCtrl.push(NewActivityPage, { user: this.user, group: this.group, groupMembers: this.groupMembers });
  }

  joinActivity(activity: any){
    //add Members to the Activity if not already in, show Pop Up if not already in 
    //get activitymembers over activityid
    console.log("ActivityId: " + activity.activityId);
    var alreadyjoined: boolean = false;
    var url = 'https://spillapi.mybluemix.net/activitymembers/id?s=' + activity.activityId;
    this.http.get(url, {}, {}).then(data => {
      var result: any = JSON.parse(data.data);
      if(data.status == 200){
        if(result.status == 200){
          console.log(result.response);
          for ( var k = 0; k < result.response.length; k++) {
            //console.log("User: " + result.response[k].activityMembersUserId);
            if(this.user.userId == result.response[k].activityMembersUserId) {
              //console.log("User: " + result.response[k].activityMembersUserId);
              alreadyjoined = true;
            }
          }
          if(!alreadyjoined){
            const join = this.alertCtrl.create({
              title: 'Join Activity?',
              message: 'Do you want to join the Activity?',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                    //console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Join',
                  handler: () => {
                    var url = 'https://spillapi.mybluemix.net/activitymembers/new?activityMembersActivityId=' + activity.activityId + '&activityMembersUserId=' + this.user.userId;
                    this.http.post(url, {},{}).then(data=>{
                      var result: any = JSON.parse(data.data);
                      if(data.status == 200){
                        console.log('User Added');
                      }
                    });
                    this.openActivity(activity);
                    console.log('Join clicked');
                  }
                }
              ]
            });
            join.present();
          }else{
            this.openActivity(activity);
          }
        } else {
          alert("Somthing went wrong with joining the Activity. Try again!");
        }
      } else {
        alert("Somthing went wrong with joining the Activity. Try again!");
      }
    });
  }   
  
  editActivity(activity: any){
    const prompt = this.alertCtrl.create({
      title: 'Edit Activity',
      message: "Change activity properties",
      inputs: [
        {
          type: 'text',
          name: 'activityName',
          placeholder: 'Activity Name'
        },
        {
          type: 'text',
          name: 'activityDescription',
          placeholder: 'Activity Description'
        },
        {
          type: 'Date',
          name: 'activityDate',
          placeholder: 'Activity Date'
        },
        {
          type: 'Time',
          name: 'activityTime',
          placeholder: 'Activity Time'
        },
        {
          type: 'text',
          name: 'activityPlace',
          placeholder: 'Activity Place'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log("SAVE Activity " + data.activityName + " " + data.activityDescription + " " + data.activityDate + " " + data.activityTime + " " + data.activityPlace);
            activity.activityName = data.activityName;
            activity.activityDescription = data.activityDescription;
            activity.activityDate = data.activityDate + data.activityTime;
            activity.activityPlace = data.activityPlace;
            this.updateActivity(activity);
          }
        }
      ]
    });
    prompt.present();
  }

  updateActivity(activity: any){
    var url = 'https://spillapi.mybluemix.net/activities/edit?name=' + activity.name + '&description=' + activity.description + '&date=' + activity.date + '&place=' + activity.place + '&activityId=' + activity.activityId;
    console.log("updating...");
    this.http.put(url, {}, {}).then(data => {
      console.log("updating...");
      var result: any = JSON.parse(data.data);
      if (data.status == 200) {
        if(result.status == 200){
          const prompt = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Successfully updated the Activity',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          prompt.present();
        } else {
          alert("Somthing went wrong with updating the Activity. Try again!");
        }
      } else {
        alert("Somthing went wrong with updating the Activity. Try again!");
      }
    });
  }

  openAddMember() {
    this.navCtrl.push(AddMemberPage, {user: this.user, group: this.group});
  }

  openActivity(activity: any) {
    //@Hanna: already did that for u, bc i needed the params :)
    this.navCtrl.push(ActivityPage, { activity: activity, user: this.user, group: this.group });
  }

  deleteActivity(activity: any) {
    //only possible when current user is admin
    //button has to be created
    console.log(activity.activityAdminId);
    console.log(this.user.userId);
    if(this.user.userId == activity.activityAdminId){
      console.log("you're the admin");
      var url = 'https://spillapi.mybluemix.net/activities/delete?id=' + activity.activityId;
      console.log("deleting....");
      this.http.delete(url, {}, {}).then(data => {
        var result: any = JSON.parse(data.data);
        console.log("deleting....");
        if (data.status == 200) {
          if(result.status == 200){
            console.log("deleting....");
            const prompt = this.alertCtrl.create({
              title: 'Success!',
              subTitle: 'Successfully deleted the Activity',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
                    this.navCtrl.pop();
                  }
                }
              ]
            });
            prompt.present();
          }else {
            alert("Somthing went wrong with deleting the Activity. Try again!");
          }
        } else {
          alert("Somthing went wrong with deleting the Activity. Try again!");
        }
      });
    } else{
      alert("You're not Admin of the Activity!");
    }
  }


}
