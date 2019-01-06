import { Component, NgModule } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SettingsPage } from '../settings/settings';
import {NewGroupPage} from '../new-group/new-group';
import { GroupPage } from '../group/group';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  user:any;
  groups:any = [];
  notifications = "";

  constructor(public navCtrl: NavController, public http: HttpClient) {

    //get user from nav
    this.user = {"userId":1,"mail":"oliver.wagner@student.reutlingen-university.de","username":"Oli","password":"Hallo"};

    //Load groupmembers
    var url = 'https://spillapi.mybluemix.net/groupmembers/user?s=' + this.user.userId;
    this.http.get(url).subscribe(data => {
      var result:any = data;
      if(result.error){

      }else{
        for(var i=0; i<result.response.length; i++){
          //Load group
          var url = 'https://spillapi.mybluemix.net/groups/id?s=' + result.response[i].groupId;
          this.http.get(url).subscribe(data => {
            var result:any = data;
            if(result.error){

            }else{
              this.groups.push(result.response[0]);
            }
          });
        }
      }
    });

    //Load invitations
    var url = 'https://spillapi.mybluemix.net/invitations';
    this.http.get(url).subscribe(data => {
      var result:any = data;
      if(result.error){

      }else{
        if(result.response.length == ''|| result.response.length == null || result.response.length == undefined){
          this.notifications = "";
        }else{
          this.notifications = " " + result.response.length;
        }        
      }
    });
  }

  openSettings(){
    this.navCtrl.push(SettingsPage, {user:this.user});
  }

  openNewGroup(){
    this.navCtrl.push(NewGroupPage);
  }

  openSelectedGroup(group){
    this.navCtrl.push(GroupPage, {group:group, user:this.user})
  }
}