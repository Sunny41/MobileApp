//Author: Sonja Czernotzky, Hanna Schulze

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewActivityPage } from '../new-activity/new-activity';
import { ActivityPage } from '../activity/activity';
import { AddMemberPage } from '../add-member/add-member';
import { HTTP } from '@ionic-native/http';


@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {
  user: any;
  activity: any = [];
  group: any;
  activities: any = [];
  activitymembers: any = [];
  groupactivities: any = [];
  groupMembers: any = [];
  groupMembersID: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP) {
    if (navParams.get('group') != null) {
      //get ids from navparams
      this.group = navParams.get('group');
      this.user = navParams.get('user');

      //console.log("GroupID: " + this.group.groupId);
      //Load activities
      var url = 'https://spillapi.mybluemix.net/activities/group?s=' + this.group.groupId;
      this.http.get(url, {}, {}).then(data =>{
        var result:any = JSON.parse(data.data);
        if(data.status == 200){
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
                  //get activitymembers over activityid
                  var url = 'https://spillapi.mybluemix.net/activitymembers/id?s=' + this.groupactivities[i].activityId;
                  this.http.get(url, {}, {}).then(data => {
                    var result: any = JSON.parse(data.data);
                    if(data.status == 200){
                      for ( var k = 0; k < result.response.length; k++) {
                        if(this.user.userId == result.response[k].userId){
                          
                        }
                      }
                    }
                  });
              }
            });
          }
        }
      });
      //load group members
      var url = 'https://spillapi.mybluemix.net/groupmembers/id?s=' + this.group.groupId;
      this.http.get(url, {}, {}).then(data =>{
        var result:any = JSON.parse(data.data);
        if(data.status == 200){
          this.groupMembersID = result.response;

          for (let i = 0; i < this.groupMembersID.length; i++) {
            //get members from id
            var url = 'https://spillapi.mybluemix.net/users/id?s=' + this.groupMembersID[i].userId;
            this.http.get(url, {}, {}).then(data =>{
              var result:any = JSON.parse(data.data);
              if(data.status == 200){
                for (var j = 0; j < result.response.length; j++) {
                  this.groupMembers.push(result.response[j]);
                }
              }
            });
          }
        }
      });
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad GroupPage');
  }

  openAddActivity() {
    //@Hanna: already did that for u, bc i needed the params :)
    this.navCtrl.push(NewActivityPage, { user: this.user, group: this.group, groupMembers: this.groupMembers });
  }

  joinActivity(activity: any){
    //add Members to the Activity if not already in
    
      var url = 'https://spillapi.mybluemix.net/activitymembers/new?activityId='+activity.activityId+'&userId='+this.user.userId;

      
      console.log("ActivityId:" + activity.activityId + ", UserId:" + this.user.userId);

      this.http.post(url, { activityId: activity.activityId, userId: this.user.userId },{});

      this.openActivity(activity);
    
  }

  openAddMember() {
    this.navCtrl.push(AddMemberPage, {user: this.user, group: this.group});
  }

  openActivity(activity: any) {
    //@Hanna: already did that for u, bc i needed the params :)
    this.navCtrl.push(ActivityPage, { activity: activity, user: this.user, group: this.group });
  }

  deleteActivity() {
    //only possible when current user is admin
    //button has to be created
  }


}
