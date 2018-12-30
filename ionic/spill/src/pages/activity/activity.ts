import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {NewPostPage} from '../new-post/new-post';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  post:string;
  allPosts = [
    {id:1, name:"Pizza", costs:30},
    {id:2, name:"Cinema", costs: 45}
  ];
  allActivityMembers=[];
  postMembers = [];
  location = '';
  memberCreated = '';
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.alertCtrl = alertCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }

  openNewPost(){
    this.navCtrl.push(NewPostPage);

  }

}
