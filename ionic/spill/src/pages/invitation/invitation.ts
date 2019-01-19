//Author: Jannik Renner
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-invitation',
  templateUrl: 'invitation.html',
})
export class InvitationPage {

  refresher:any;
  user:any;
  invitationsFull:any = [];
  invitations:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP, private alertCtrl: AlertController) {
    this.user = navParams.get('user');
    this.invitations = navParams.get('invitations');

    this.loadInvitations();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationPage');
  }

  loadInvitations(){
    //Load groups
    var groups:any = [];
    for(var i=0; i<this.invitations.length; i++){
      
      var url = 'https://spillapi.mybluemix.net/groups/id?s=' + this.invitations[i].invitationForGroupId;
      this.http.get(url, {}, {}).then(data =>{
        if(data.status == 200){
          var response = JSON.parse(data.data);
          groups.push(response.response[0]);
          var group = response.response[0];

          for(var j=0; j<this.invitations.length; j++){
            //Load user who invited
            var url = 'https://spillapi.mybluemix.net/users/id?s=' + this.invitations[j].invitationFromUserId;
            this.http.get(url, {}, {}).then(data =>{
              if(data.status == 200){
                var response = JSON.parse(data.data);
                var user = response.response[0];

                for(var k=0; k<this.invitations.length; k++){
                  if(this.invitations[k].invitationFromUserId == user.userId){
                    
                    var invitationFull = {"invitationFromUserId":this.invitations[k].invitationFromUserId, "invitationForGroupId":this.invitations[k].invitationForGroupId, "userName":user.username, "groupName":group.name, "invitationId":this.invitations[k].invitationId}
                    this.invitationsFull.push(invitationFull);
                  }
                }

                if(this.refresher != null && this.refresher != undefined){
                  this.refresher.complete();
                }
              }
            });
          }
        }
      });
    }
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.loadInvitations();
  }

  openInvitation(groupId, invitiationId){
    let alert = this.alertCtrl.create({
      title: 'Confirm invitation',
      message: 'Do you want to join this group?',
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
            //Join group
            var url="https://spillapi.mybluemix.net/groupmembers/new?groupId=" + groupId + "&userId=" + this.user.userId;
            this.http.post(url, {}, {}).then(data =>{
              let alert = this.alertCtrl.create({
                title: 'Success',
                subTitle: 'You have been added to the group.',
                buttons: ['Dismiss']
              });
              alert.present();

              //Delete invitation
              var url = "https://spillapi.mybluemix.net/invitations/delete/?id=" + invitiationId;
              this.http.delete(url, {}, {}).then(data =>{
                this.loadInvitations();
              });
            });
          }
        }
      ]
    });
    alert.present();
  }

}
