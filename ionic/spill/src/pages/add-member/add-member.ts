//Author: Hanna Schulze
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html',
})
export class AddMemberPage {

  group: any;
  user: any;
  mail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP, public alertCtrl: AlertController) {
    this.group = navParams.get('group');
    this.user = navParams.get('user');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddMemberPage');
  }

  inviteUser(){
    //invite People for Groups with identifier: Mailadress
    //in invitations table: /new
    //{invitedUserId, invitationFromUserId, invitationForGroupId}
    var url = 'https://spillapi.mybluemix.net/users/mail?s=' + this.mail;
    this.http.get(url, {}, {}).then(data=>{
      var result = JSON.parse(data.data);
      if(data.status == 200){
        if(result.status == 200){
          var user: any = result.response[0];
          var url = 'https://spillapi.mybluemix.net/invitations/new?invitedUserId=' + user.userId + '&invitationFromUserId=' + this.user.userId + '&invitationForGroupId=' + this.group.groupId;
          this.http.post(url, {}, {}).then(data=>{
            var result = JSON.parse(data.data);
            if(data.status == 200){
              const join = this.alertCtrl.create({
                title: 'Success',
                message: 'User successfully invited.',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                      this.navCtrl.pop();
                    }
                  }
                ]
              });
              join.present();
            }
          });
        }
      }
    });
  }

}
