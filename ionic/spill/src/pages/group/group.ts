//Author: Sonja Czernotzky, Hanna Schulze

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP, 
    public alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController) {
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

              //Sort in alphabetical order
              this.activities.sort(function(a, b) { 
                return a.name.localeCompare(b.name);
              });
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
    var alreadyjoined: boolean = false;
    var url = 'https://spillapi.mybluemix.net/activitymembers/id?s=' + activity.activityId;
    this.http.get(url, {}, {}).then(data => {
      if(data.status == 200){
        var result: any = JSON.parse(data.data);
        if(result.status == 200){
          for ( var k = 0; k < result.response.length; k++) {
            if(this.user.userId == result.response[k].activityMembersUserId) {
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
                  }
                },
                {
                  text: 'Join',
                  handler: () => {
                    var url = 'https://spillapi.mybluemix.net/activitymembers/new?activityMembersActivityId=' + activity.activityId + '&activityMembersUserId=' + this.user.userId;
                    this.http.post(url, {},{}).then(data=>{                      
                      if(data.status == 200){
                        var result: any = JSON.parse(data.data);
                        if(result.status == 200){
                          this.openActivity(activity);
                        }
                      }
                    });
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
          value: activity.name,
          placeholder: 'Activity Name'
        },
        {
          type: 'text',
          name: 'activityDescription',
          value: activity.description,
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
          value: activity.place,
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
            if(data.activityName == undefined || data.activityName == ''){
              this.simpleToast("Error", "Please enter a name for your activity.");
              return;
            }
            activity.name = data.activityName;
            activity.description = data.activityDescription;
            activity.date = data.activityDate + data.activityTime;
            activity.place = data.activityPlace;
            this.updateActivity(activity);
          }
        }
      ]
    });
    prompt.present();
  }

  updateActivity(activity: any){
    var url = 'https://spillapi.mybluemix.net/activities/edit?name=' + activity.name + '&description=' + activity.description + '&date=' + activity.date + '&place=' + activity.place + '&activityId=' + activity.activityId;
    this.http.put(url, {}, {}).then(data => {
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
                  this.load();
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
    this.navCtrl.push(ActivityPage, { activity: activity, user: this.user, group: this.group });
  }

  deleteActivity(activity: any) {
    //only possible when current user is admin
    //button has to be created
    if(this.user.userId == activity.activityAdminId){
      var url = 'https://spillapi.mybluemix.net/activities/delete?id=' + activity.activityId;
      this.http.delete(url, {}, {}).then(data => {
        var result: any = JSON.parse(data.data);
        if (data.status == 200) {
          if(result.status == 200){
            
            //Reload data
            this.load();

            //Show success
            const prompt = this.alertCtrl.create({
              title: 'Success!',
              subTitle: 'Successfully deleted the Activity',
              buttons: [
                {
                  text: 'OK',
                  handler: () => {
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


  presentActionSheet(activity) {
    //check if user is admin
    var userIsAdmin = false;
    if(this.user.userId == activity.activityAdminId){
      userIsAdmin = true;
    }

    var title = "Modify the activity";
    //Admin options
    if (userIsAdmin) {
      const actionSheet = this.actionSheetCtrl.create({
        title: title,
        buttons: [
          {
            text: 'Open',
            handler: () => {
              this.joinActivity(activity);
            }
          },
          {
            text: 'Edit',
            handler: () => {
              this.editActivity(activity);
            }
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.deleteActivity(activity);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      actionSheet.present();
    } else {
      //Not Admin options. Just open the activity
      this.joinActivity(activity);
    }
  }

  //Show a simple toast with title and message
  simpleToast(title, message){
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
