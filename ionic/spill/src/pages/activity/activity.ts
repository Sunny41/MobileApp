import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { NewItemPage } from '../new-item/new-item';
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
  itemMembers:any=[];
  activityMembers:any=[];
  userItems:any=[];
  userInvitedItems:any=[];
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public alertCtrl: AlertController ) {

    if(navParams.get('group')!=null){
      this.group = navParams.get('group');
      this.user = navParams.get('user');
      this.activity = navParams.get('activity');

      //load activity members
      var url = 'https://spillapi.mybluemix.net/activitymembers/'+'id?s='+this.activity.activityId;
      this.http.get(url).subscribe(data=>{
        var result:any=data;
        if(result.error){

        }else{
          this.activityMembers=result.response;
        }

      });

      //load my added items
      var url = 'https://spillapi.mybluemix.net/itemsinvited/'+'user?s='+this.user.userId;
      this.http.get(url).subscribe(data=>{
        var result:any=data;
        if(result.error){
        }else{
          console.log("Items invited user: " + result.response);
          this.userItems=result.response;
        }
      });

      //load the items i am invited to
      var url = 'https://spillapi.mybluemix.net/itemsinvited/'+'invited?s='+this.user.userId;
      this.http.get(url).subscribe(data=>{
        var result:any=data;
        if(result.error){

        }else{
          console.log("Items invited: " + result.response);
          for(var i=0; i<result.response.length; i++){
            this.userInvitedItems.push(result.response[i]);
          }
        }

      });
    }
  }
    

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }

  openNewPost(){
    this.navCtrl.push(NewItemPage,{user:this.user,activity:this.activity, group:this.group, activityMembers:this.activityMembers});
  }

  openItem(item){
    //check if this.user.id == this.item.userID (admin)
    //if yes: show edit screen, params needed: itemid, activityid, userid, groupid
    this.navCtrl.push(EditItemPage,{user:this.user,activity:this.activity, item:this.item, group:this.group});
    //if no: do nothing
  }

  editActivity(){
    // params needed: user, groupid, activityid
  }

  editItem(item){
    const prompt = this.alertCtrl.create({
      title: 'Set paid status',
      message: "Have you paid the item?",
      inputs: [
        {
          type: 'tel',
          name: 'amount',
          placeholder: item.amount,
          value: item.amount
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log("SAVE ITEM");
          }
        }
      ]
    });
    prompt.present();
  }

}
