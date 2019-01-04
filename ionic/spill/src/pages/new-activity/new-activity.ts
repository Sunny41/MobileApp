import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-new-activity',
  templateUrl: 'new-activity.html',
})
export class NewActivityPage {
  member: string;
  group: any;
  user: any;
  membersToAdd: any = [];
  groupMembers: any = [];
  groupMembersId: any = [];




  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.group = navParams.get('group');
    this.user = navParams.get('user');

    //load groupmembers
    var url = 'https://spillapi.mybluemix.net/groupmembers/id?s=' + this.group.groupId;
    this.http.get(url).subscribe(data => {
      var result: any = data;
      if (result.error) {

      } else {
        this.groupMembersId = result.response;
        for (let i = 0; i < this.groupMembersId.length; i++) {
          var url2 = 'https://spillapi.mybluemix.net/users/id?s=' + this.groupMembersId[i].userId;
          this.http.get(url2).subscribe(data => {
            var result: any = data;
            if (result.error) {

            } else {
              this.groupMembers.append(result.response.username);

            }
          });

        }
      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewActivityPage');
  }

  onInput(event) {
    var temp = this.groupMembers.find(x => x.username == this.member)
    if (temp) {
      this.membersToAdd.push(temp);
      this.member = '';
    } else {
      //show error
    }
    console.log(this.member);
    console.log("Input event");
  }

  delMember(id) {
    var index = this.membersToAdd.indexOf(this.membersToAdd.find(x => x.id == id));
    console.log(index);
    this.membersToAdd.splice(index);
    //console.log(id);
  }

  addActivity() {
    //store in db:
    // in activity table:
    // {name, description, date, place, activityAdminId}
    // for each member one entry in itemsInvited:
    // {activityMembersActivityId, activityMembersUserId}
    // in groupactivities:
    // {groupId, activityId}


    this.navCtrl.push(GroupPage,{user:this.user, group:this.group});
  }

}
