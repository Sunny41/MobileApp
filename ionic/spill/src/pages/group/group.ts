import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewActivityPage } from '../new-activity/new-activity';
import { ActivityPage } from '../activity/activity';
import { AddMemberPage } from '../add-member/add-member';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {
  user: any;
  activity: any = [];
  group: any;
  activities: any = [];
  groupactivities: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    if (navParams.get('group') != null) {
      //get ids from navparams
      this.group = navParams.get('group');
      this.user = navParams.get('user');

      console.log("GroupID: " + this.group.groupId);
      //Load activities
      var url = 'https://spillapi.mybluemix.net/groupactivities/id?s=' + this.group.groupId;
      this.http.get(url).subscribe(data => {
        var result: any = data;
        if (result.error) {

        } else {
          this.groupactivities = result.response;
          
          for (let i = 0; i < this.groupactivities.length; i++) {
            //get activities from id
            var url = 'https://spillapi.mybluemix.net/activities/id?s=' + this.groupactivities[i].activityId;
            this.http.get(url).subscribe(data => {
              var result: any = data;
              if (result.error) {

              } else {
                for(var i=0; i<result.response.length; i++){
                  this.activities.push(result.response[i]);
                }
              }
            });
          }
        }
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
  }

  openAddActivity() {
    //@Hanna: already did that for u, bc i needed the params :)
    this.navCtrl.push(NewActivityPage, { user: this.user, group: this.group });
  }

  openAddMember() {
    this.navCtrl.push(AddMemberPage);
  }

  openActivity(activity: any) {
    //@Hanna: already did that for u, bc i needed the params :)
    this.navCtrl.push(ActivityPage, { activity: activity, user: this.user, group: this.group });
  }


}
