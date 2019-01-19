//Author: Jannik Renner
import { Component, NgModule } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import {NewGroupPage} from '../new-group/new-group';
import { GroupPage } from '../group/group';
import { HTTP } from '@ionic-native/http';
import { InvitationPage } from '../invitation/invitation';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  refresher:any;
  user:any;
  groups:any = [];
  notifications = "";
  invitations:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {

    //get user from nav
    this.user =  navParams.get('user');

    //Load groupmembers
    this.loadGroups();

    //Load invitations
    this.loadInvitations();
  }

  loadGroups(){
    var url = 'https://spillapi.mybluemix.net/groupmembers/user?s=' + this.user.userId;

    this.http.get(url, {}, {}).then(data =>{
      var result:any = JSON.parse(data.data);

      if(result.status == 200){
        this.groups = [];
        for(var i=0; i<result.response.length; i++){
          //Load group
          var url = 'https://spillapi.mybluemix.net/groups/id?s=' + result.response[i].groupId;
          this.http.get(url, {}, {}).then(data => {
            var result:any = JSON.parse(data.data);
            this.groups.push(result.response[0]);

            this.groups.sort(function(a, b) { 
              return a.name.localeCompare(b.name);
            });
          });
        } 
        
        if(this.refresher != null && this.refresher != undefined){
          this.refresher.complete();
        }
      }else{
        //logout
      }
    });
  }

  loadInvitations(){
    var url = 'https://spillapi.mybluemix.net/invitations/invitedUser?s=' + this.user.userId;
    this.http.get(url, {}, {}).then(data =>{
      var result:any = JSON.parse(data.data);
      if(result.status == 200){
        if(result.response.length == ''|| result.response.length == null || result.response.length == undefined){
          this.notifications = "";
        }else{
          this.notifications = " " + result.response.length;

          this.invitations = [];
          
          for(var i=0; i<result.response.length; i++){
            this.invitations.push(result.response[i]);
          }
        } 
      }
    }); 
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.loadGroups();
    this.loadInvitations();
  }

  openSettings(){
    this.navCtrl.push(SettingsPage, {user:this.user});
  }

  openNewGroup(){
    this.navCtrl.push(NewGroupPage, {user:this.user});
  }

  openSelectedGroup(group){
    this.navCtrl.push(GroupPage, {group:group, user:this.user})
  }

  openInvitations(){
    if(this.notifications != ''){
      this.navCtrl.push(InvitationPage, {user: this.user, invitations: this.invitations});
    }    
  }
}