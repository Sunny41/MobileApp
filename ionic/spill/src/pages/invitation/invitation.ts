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
  invitations:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP, private alertCtrl: AlertController) {
    this.user = navParams.get('user');
    this.invitations = navParams.get('invitations');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationPage');
  }

  loadInvitations(){
    this.invitations = [];
    var url = 'https://spillapi.mybluemix.net/invitations/invitedUser?s=' + this.user.userId;
    this.http.get(url, {}, {}).then(data =>{
      var result:any = JSON.parse(data.data);
      if(result.status == 200){
        for(var i=0; i<result.response.length; i++){
          this.invitations.push(result.response[i]);
        }
      }
    }); 
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
        },
        {
          text: 'Deny',
          handler: () => {
            //Delete invitation
            var url = "https://spillapi.mybluemix.net/invitations/delete/?id=" + invitiationId;
            this.http.delete(url, {}, {}).then(data =>{
              let alert = this.alertCtrl.create({
                title: 'Success',
                subTitle: 'You have denied joining the group.',
                buttons: ['Dismiss']
              });
              alert.present();
              this.loadInvitations();
            });
          }
        }
      ]
    });
    alert.present();
  }

}
