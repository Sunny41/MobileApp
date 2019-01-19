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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HTTP, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {

    if (navParams.get('group') != null) {
      this.group = navParams.get('group');
      this.user = navParams.get('user');
      this.activity = navParams.get('activity');
      this.isAdmin = true;
      //this.activity.activityAdminId == this.user.userId;

      //load activity members
      var url = 'https://spillapi.mybluemix.net/activitymembers/id?s=' + this.activity.activityId;
      this.http.get(url, {}, {}).then(data => {
        var result: any = JSON.parse(data.data);
        if (data.status == 200) {
          this.activityMembersId = result.response;
          for (var i = 0; i < this.activityMembersId.length; i++) {
            var url2 = 'https://spillapi.mybluemix.net/users/id?s=' + this.activityMembersId[i].activityMembersUserId;
            this.http.get(url2, {}, {}).then(data => {
              var result2: any = JSON.parse(data.data);
              if (data.status == 200) {
                for (var j = 0; j < result2.response.length; j++) {
                  this.activityMembers.push(result2.response[j]);
                }
              }
            });
          }
        }
        });
    }
    //load my added items
    var url = 'https://spillapi.mybluemix.net/itemsinvited/user?s=' + this.user.userId;
    this.http.get(url, {}, {}).then(data => {
      var result: any = JSON.parse(data.data);
      if (data.status == 200) {
        for( var j =0; j<result.response.length;j++){
          this.userItems.push(result.respone[j]);
        }
      } 
    });

    //load the items i am invited to
    var url = 'https://spillapi.mybluemix.net/itemsinvited/invited?s=' + this.user.userId;
    this.http.get(url, {}, {}).then(data => {
      var result: any = JSON.parse(data.data);
      if (data.status == 200) {
        //initialize balances[]
        for (var i = 0; i < result.response.length; i++) {
          this.userInvitedItems.push(result.response[i]);
        }
      }
    });
  }



ionViewDidLoad() {
  //console.log('ionViewDidLoad ActivityPage');
}

openNewItem() {
  this.navCtrl.push(NewItemPage, { user: this.user, activity: this.activity, group: this.group, activityMembers: this.activityMembers });
}

openEdit() {
  // params needed: user, groupid, activityid
}

editItem(item) {
  const prompt = this.alertCtrl.create({
    title: 'Edit Item',
    message: "Change item properties",
    inputs: [
      {
        type: 'text',
        name: 'itemName',
        placeholder: 'Item Name'
      },
      {
        type: 'text',
        name: 'itemDescription',
        placeholder: 'Item Description'
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
          console.log("SAVE ITEM " + data.itemName + " " + data.itemDescription);
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
          console.log("SAVE ITEM");
        }
      }
    ]
  });
  prompt.present();
}

updateItem(item){
  var url = 'https://spillapi.mybluemix.net/items/';
  this.http.get(url, {}, {}).then(data => {
    var result: any = JSON.parse(data.data);
    if (data.status == 200) {

    } else {

    }
  });
}

deleteItem(item){
  var url = 'https://spillapi.mybluemix.net/items/';
  this.http.get(url, {}, {}).then(data => {
    var result: any = JSON.parse(data.data);
    if (data.status == 200) {

    } else {

    }
  });
}

presentActionSheet(item) {
  var title = "Modify the item";
  //Admin options
  if (this.isAdmin) {
    const actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteItem(item);
          }
        },
        {
          text: 'Edit',
          handler: () => {
            this.editItem(item);
          }
        },
        {
          text: 'Pay',
          handler: () => {
            this.payItem(item);
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
  } else {
    //Not Admin options
    const actionSheet = this.actionSheetCtrl.create({
      title: title,
      buttons: [
        {
          text: 'Pay',
          handler: () => {
            this.payItem(item);
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

}

  }
