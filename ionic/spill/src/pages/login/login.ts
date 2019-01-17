//Author: Jannik Renner
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { RegisterPage } from '../register/register';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  email:string;
  password:string;

  constructor(public navCtrl: NavController, private http: HTTP){
  }

  login(){
    if(this.email == undefined || this.password == undefined ||
      this.email.length == 0 || this.password.length == 0){
      //Show error
      alert("Please fill in all fields");
    }else{
      //Try login
      var url = 'https://spillapi.mybluemix.net/users/login?mail=' + this.email + '&password=' + this.password;

      this.http.post(url, {}, {})
      .then(data => {
        var result:any = JSON.parse(data.data);
        console.log("status " + data.status + " " + (data.status == 200) + " " + (data.status === 200));
        if(data.status === 200){
          var user = result.response[0];
          this.navCtrl.push(DashboardPage, {user:user});
        }else{
          alert("Wrong username or password! Please try again.")
        }
        
      })
      .catch(error => {
        alert("Something went wrong... please try again.");
      });
    }      
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
