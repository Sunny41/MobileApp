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
      var url = 'https://spillapi.mybluemix.net/users';

      this.http.get(url, {}, {})
      .then(data => {
        var result:any = data;
        if(result.error){
          //Show error
        }else{
          //Login user
          var user = {"userId":1,"mail":"oliver.wagner@student.reutlingen-university.de","username":"Oli","password":"Hallo"};
          this.navCtrl.push(DashboardPage, {user:user});
        }
      })
      .catch(error => {
      });
    }      
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
