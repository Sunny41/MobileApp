import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { RegisterPage } from '../register/register';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  email:string;
  password:string;

  constructor(public navCtrl: NavController, public http: HttpClient){
  }

  login(){
    if(this.email == undefined || this.password == undefined ||
      this.email.length == 0 || this.password.length == 0){
      //Show error
      alert("Please fill in all fields");
    }else{
      //Try login
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

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
