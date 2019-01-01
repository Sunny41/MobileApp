import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { NewPostPage } from '../new-post/new-post';
import { HttpClient } from '@angular/common/http';
import { EditItemPage } from '../edit-item/edit-item';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  user:any;
  item:any;
  items:any;
  group:any;
  activity:any;
  itemMembers:any;
  activityMembers:any;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient ) {

    if(navParams.get('group')!=null){
      this.group = navParams.get('group');
      this.user = navParams.get('user');
      this.activity = navParams.get('activity');

    //Load assets
      var url = 'https://spillapi.mybluemix.net/items';
      this.http.get(url).subscribe(data => {
        var result:any = data;
        console.log(data);
        if(result.error){

        }else{
          this.items = result.response;
        }
      });
      //load activity members

      //load item members of each activity in this group
    }
  }
    

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }

  openNewPost(){
    this.navCtrl.push(NewPostPage,{user:this.user,activity:this.activity});
  }

  openItem(item){
    //check if this.user.id == this.item.userID (admin)
    //if yes: show edit screen, params needed: itemid, activityid, userid, groupid
    this.navCtrl.push(EditItemPage,{user:this.user,activity:this.activity, item:this.item, group:this.group});
    //if no: do nothing
    

  }

}
