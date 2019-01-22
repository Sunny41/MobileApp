//Author: Jannik Renner
import { Component, NgModule } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController  } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP, 
    private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {
    //get user from nav
    this.user =  navParams.get('user');
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

  deleteGroup(group){
    //check if user is admin
    var userIsAdmin = false;
    if(this.user.userId == group.groupAdminId){
      userIsAdmin = true;
    }

    if(userIsAdmin){
      var url="https://spillapi.mybluemix.net/groups/delete?id=" + group.groupId;
      this.http.delete(url, {}, {}).then(data =>{
        if(data.status == 200){
          var result = JSON.parse(data.data);
          if(result.status == 200){
            this.loadGroups();
            this.loadInvitations();

            this.simpleToast("Success", "The group has successfully deletet");
          }else{
            this.simpleToast("Error", "Something went wrong. Please try again.");
          }
        }else{
          this.simpleToast("Error", "Something went wrong. Please try again.");
        }
      });
    }    
  }

  editGroup(group) {
    const prompt = this.alertCtrl.create({
      title: 'Edit Group',
      message: "Change group properties",
      inputs: [
        {
          type: 'text',
          name: 'groupName',
          placeholder: 'Group Name'
        },
        {
          type: 'text',
          name: 'groupDescription',
          placeholder: 'Group Description'
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
            if(data.groupName == undefined || data.groupName == '' || data.groupName.length == 0){
              this.simpleToast("Error", "Group name must be at least one character long.");
            }else{
              group.name = data.groupName;
              group.description = data.groupDescription;
              this.updateGroup(group);
            }            
          }
        }
      ]
    });
    prompt.present();
  }

  updateGroup(group){
    var url="";
    this.http.put(url, {}, {}).then(data => {
      if(data.status == 200) {
        var result = JSON.parse(data.data);
        if(result.status == 200){
          this.simpleToast("Success", "The group has been updatet.");
        }else{
          this.simpleToast("Error", "Something went wrong. Please try again.");
        }
      }else{
        this.simpleToast("Error", "Something went wrong. Please try again.");
      }
    });
  }

  ionViewWillEnter(){
    //Load groupmembers
    this.loadGroups();

    //Load invitations
    this.loadInvitations();
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

  //Open action sheep for group page
  //Admin has deleting and updating option
  presentActionSheet(group) {
    //check if user is admin
    var userIsAdmin = false;
    if(this.user.userId == group.groupAdminId){
      userIsAdmin = true;
    }

    var title = "Modify the group";
    //Admin options
    if (userIsAdmin) {
      const actionSheet = this.actionSheetCtrl.create({
        title: title,
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.deleteGroup(group);
            }
          },
          {
            text: 'Edit',
            handler: () => {
              this.editGroup(group);
            }
          },
          {
            text: 'Open',
            handler: () => {
              this.openSelectedGroup(group);
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
      //Not Admin options
      const actionSheet = this.actionSheetCtrl.create({
        title: title,
        buttons: [
          {
            text: 'Open',
            handler: () => {
              this.openSelectedGroup(group);
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