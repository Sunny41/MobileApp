//Author: Sonja Czernotzky

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { NewItemPage } from '../new-item/new-item';
import { HTTP } from '@ionic-native/http';


@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  refresher:any;
  user: any;
  item: any;
  items: any;
  group: any;
  activity: any;
  itemMembers: any = [];
  activityMembers: any = [];
  activityMembersId: any = [];
  userItems: any = [];
  userInvitedItems: any = [];
  isAdmin: boolean;
  totalDepth:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HTTP, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {

    if (navParams.get('group') != null) {
      this.group = navParams.get('group');
      this.user = navParams.get('user');
      this.activity = navParams.get('activity');
      this.isAdmin = true;
      //this.activity.activityAdminId == this.user.userId;
    }else{
      //show error
    }

  }



ionViewDidLoad() {
  console.log('ionViewDidLoad ActivityPage');
}

ionViewWillEnter(){
  this.load();
}

load(){
//load activity members
var url = 'https://spillapi.mybluemix.net/activitymembers/id?s=' + this.activity.activityId;
this.http.get(url, {}, {}).then(data => {
  if (data.status == 200) {
    var result: any = JSON.parse(data.data);
    if(result.status == 200){
      this.activityMembersId = result.response;
      this.activityMembers = [];
      for (var i = 0; i < this.activityMembersId.length; i++) {
        var url2 = 'https://spillapi.mybluemix.net/users/id?s=' + this.activityMembersId[i].activityMembersUserId;
        this.http.get(url2, {}, {}).then(data => {

          if (data.status == 200) {
            var result2: any = JSON.parse(data.data);
            if(result2.status == 200){
              for (var j = 0; j < result2.response.length; j++) {
                this.activityMembers.push(result2.response[j]);
              }
            }
          }
        });
      }
    }

    if(this.refresher != null && this.refresher != undefined){
      this.refresher.complete();
    }
  }
  });

  //load my added items
  var url = 'https://spillapi.mybluemix.net/itemsinvited/user?userId=' + this.user.userId + '&activityId=' + this.activity.activityId;
  this.http.get(url, {}, {}).then(data => {
    if (data.status == 200) {
      var result: any = JSON.parse(data.data);
      this.userItems = [];
      if(result.status == 200){
        for( var j =0; j<result.response.length;j++){
          this.userItems.push(result.response[j]);
        }

        if(this.refresher != null && this.refresher != undefined){
          this.refresher.complete();
        }
      }
    }
  });

  //load the items i am invited to
  var url = 'https://spillapi.mybluemix.net/itemsinvited/invited?userId=' + this.user.userId + '&activityId=' + this.activity.activityId;
  this.http.get(url, {}, {}).then(data => {
    if (data.status == 200) {
      var result: any = JSON.parse(data.data);
      this.userInvitedItems = [];
      if(result.status == 200){
        //initialize balances[]
        for (var i = 0; i < result.response.length; i++) {
          this.totalDepth += result.response[i].amount;

          this.userInvitedItems.push(result.response[i]);
        }

        if(this.totalDepth == undefined || this.totalDepth == NaN){
          this.totalDepth = 0;
        }
        if(this.refresher != null && this.refresher != undefined){
          this.refresher.complete();
        }
      }
    }
  });
}

doRefresh(refresher) {
  this.refresher = refresher;
  this.load();
}

openNewItem() {
  this.navCtrl.push(NewItemPage, { user: this.user, activity: this.activity, group: this.group, activityMembers: this.activityMembers });
}


editItem(item) {
  const prompt = this.alertCtrl.create({
    title: 'Edit Item',
    message: "Change item properties",
    inputs: [
      {
        type: 'text',
        name: 'itemName',
        value: item.itemName
      },
      {
        type: 'text',
        name: 'itemDescription',
        value: item.itemDescription
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
          item.itemName = data.itemName;
          item.itemDescription = data.itemDescription;
          this.updateItem(item);
        }
      }
    ]
  });
  prompt.present();
}

payItem(item){
  const prompt = this.alertCtrl.create({
    title: 'Set paid status',
    message: "How much have you paid?",
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
          if(data.amount <= 0 || data.amount > item.amount){
            this.simpleToast("Error", "Please fill in a correct amount");
          }else{
            //Pay
            var url="https://spillapi.mybluemix.net/payments/new?";
            this.http.post(url, {}, {}).then(data => {

            });
          }
        }
      }
    ]
  });
  prompt.present();
}

updateItem(item){
  var url = 'https://spillapi.mybluemix.net/items/edit?itemName=' + item.itemName + '&itemDescription=' + item.itemDescription + '&itemId=' + item.itemId;
  this.http.get(url, {}, {}).then(data => {
    if (data.status == 200) {
      var result: any = JSON.parse(data.data);
      if(result.status == 200){
        this.simpleToast("Success", "The item has been updated successfully");
      }else{
        this.simpleToast("Error", "Something went wrong updating the item");
      }
    } else {
      this.simpleToast("Error", "Something went wrong updating the item");
    }
  });
}

deleteItem(item){
  var url = 'https://spillapi.mybluemix.net/itemsinvited/delete?id=' + item.itemId;
  this.http.delete(url, {}, {}).then(data => {
    if (data.status == 200) {
      var result: any = JSON.parse(data.data);
      if(result.status == 200){
        this.simpleToast("Success", "The item has been deleted successfully.");
      }else{
        this.simpleToast("Error", "Something went wrong deleting the item.");
      }
    } else {
      this.simpleToast("Error", "Something went wrong deleting the item.");
    }
  });
}

  presentActionSheetMyItem(item) {
    const actionSheet = this.actionSheetCtrl.create({
      title: "Edit yout item",
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.editItem(item);
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteItem(item);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  simpleToast(title, message){
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
