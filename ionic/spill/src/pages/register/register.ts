//Author: Jannik Renner

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email:string;
  username:string;
  password:string;
  rePassword:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    if(this.username == undefined || this.email == undefined || this.password == undefined || this.rePassword == undefined ||
      this.username.length == 0 || this.email.length == 0 || this.password.length == 0 || this.rePassword.length == 0){
      //Show error
      alert("Please fill in all fields");
    }else{
      //Try register
      var body;
      var url = 'https://spillapi.mybluemix.net/users/new?mail=' + this.email + '&username=' + this.username + 
        '&password=' + this.password;
      this.http.post(url, {}, {}).then(data => {
        var result:any = JSON.parse(data.data);
        if(result.error){
          //Show error
        }else{
          //Login user
          var user = result.response[0];
          this.navCtrl.push(DashboardPage, {user:user});
        }
      });
    }
  }
}
