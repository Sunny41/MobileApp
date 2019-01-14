//Author: Sonja Czernotzky

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-new-activity',
  templateUrl: 'new-activity.html',
})
export class NewActivityPage {
  group: any;
  user: any;
  membersToAdd: any = [];
  groupMembers: any = [];
  checkedMembers: boolean[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
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
    // for each member one entry in itemsInvited:
    // {activityMembersActivityId, activityMembersUserId}
    // in groupactivities:
    // {groupId, activityId}


    this.navCtrl.push(GroupPage, { user: this.user, group: this.group });
  }

}
