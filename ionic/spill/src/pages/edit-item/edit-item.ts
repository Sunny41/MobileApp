//Author: Sonja Czernotzky Tim Herold
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {
  refresher:any;
  user: any;
  item: any;
  items: any;
  group: any;
  activity: any;
  userItems: any = [];
  userInvitedItems: any = []
  isAdmin:boolean;


  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams, public http: HTTP, public actionSheetCtrl: ActionSheetController) {
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
    //console.log('ionViewDidLoad EditItemPage');
    this.loadOwnItems();
  }
  /*ionViewWillEnter(){
    this.loadOwnItems();
  }*/

  doRefresh(refresher) {
    this.refresher = refresher;
    this.loadOwnItems();
  }

  loadOwnItems(){
    //load my added items
    var url = 'https://spillapi.mybluemix.net/itemsinvited/invited?userId=' + this.user.userId + '&activityId=' + this.activity.activityId;
    this.http.get(url, {}, {}).then(data => {
      if (data.status == 200) {
        var result: any = JSON.parse(data.data);
        this.userInvitedItems = [];
        if(result.status == 200){

          if(this.refresher != null && this.refresher != undefined){
            this.refresher.complete();
          }
        }
      }
    });
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
          placeholder: item.itemDescription
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
    var url = 'https://spillapi.mybluemix.net/itemsinvited/edit?itemInvitedId='+item.itemInvitedId+'';
    this.http.put(url, {}, {}).then(data => {
      var result: any = JSON.parse(data.data);
      if (data.status == 200) {

      } else {
        alert(Error);
      }
    });
  }

  deleteItem(item){
    alert(item.ItemId + " "+item.itemInvitedId)
    var url = 'https://spillapi.mybluemix.net/itemsinvited/delete?itemInvitedId='+item.invitedId;
    this.http.delete(url, {}, {}).then(data => {
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
