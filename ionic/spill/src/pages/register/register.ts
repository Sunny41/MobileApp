import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
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
      var url = 'https://spillapi.mybluemix.net/invitations';
      this.http.get(url).subscribe(data => {
        var result:any = data;
        if(result.error){
          //Show error
        }else{
          //Login user
          this.navCtrl.push(DashboardPage);
        }
      });
    }
  }
}
