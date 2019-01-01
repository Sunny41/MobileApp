import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewActivityPage} from '../new-activity/new-activity';
import { ActivityPage } from '../activity/activity';
import { AddMemberPage } from '../add-member/add-member';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {
  user:any;
  activity: any=[];
  group:any;
  activities:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    if(navParams.get('group')!=null){
      //get ids from navparams
      this.group = navParams.get('group');
      this.user = navParams.get('user');

      //Load activities
      // @Hanna: load only the groups activities! this url loads all activities.
      // oli will do one that loads only the activities from a given group id
      var url = 'https://spillapi.mybluemix.net/activities';
      this.http.get(url).subscribe(data => {
      var result:any = data;
      console.log(data);
      if(result.error){

      }else{
        this.activities = result.response;
      }
    });
    }
    console.log('constructor');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
  }

  openAddActivity(){
    //@Hanna: already did that for u, bc i needed the params :)
    this.navCtrl.push(NewActivityPage,{ user:this.user, group:this.group});
  }

  openAddMember(){
    this.navCtrl.push(AddMemberPage);
  }

  openActivity(activity:any){
    //@Hanna: already did that for u, bc i needed the params :)
    this.navCtrl.push(ActivityPage, {activity:activity, user:this.user, group:this.group});
  }

}
