//Author: Hanna Schulze

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-new-group',
  templateUrl: 'new-group.html',
})
export class NewGroupPage {

  user:any;
  name:string;
  description:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    this.user =  navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewGroupPage');
  }

  addNewGroup(){    
    if(this.name != undefined && this.name.length >= 1){
      var url = 'https://spillapi.mybluemix.net/groups/new?name=' + this.name + '&description=' + this.description + '&groupAdminId=' + this.user.userId;
      this.http.post(url, {}, {}).then(data =>{
        var result = JSON.parse(data.data);
        console.log("status " + data.status);
        if(data.status == 200){
          console.log("data " + data.data);
          console.log("group " + result.response);
          console.log("group " + result.response[0]);
          var group = result.response[0];
          this.navCtrl.push(GroupPage, {group: group, user:this.user});
        } else{
          alert("something went wrong. please try again");
        }
      })
      .catch( error => { console.error(error) });
    }else{
      alert("please fill in a group name!");
    }
  }
}
