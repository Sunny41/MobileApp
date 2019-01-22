//Author: Sonja Czernotzky
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  itemNAME:string;
  itemDescription:string;
  itemID: number;


  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams, public http: HTTP) {
    if (navParams.get('group') != null) {
      this.group = navParams.get('group');
      this.user = navParams.get('user');
      this.activity = navParams.get('activity');
      //this.isAdmin = true;
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
    var url = 'https://spillapi.mybluemix.net/items/user?s=' + this.user.userId;
    this.http.get(url, {}, {}).then(data => {
      var result: any = JSON.parse(data.data);
      this.userItems = [];
      if (data.status == 200) {
        var change: any =[];
        change=result.response;
        for(var i=0;i<=change.length-1;i++){
          if(change[i].itemActivityId==this.activity.activityId){
            this.userItems.push(change[i])
          }

        }
        if(this.refresher != null && this.refresher != undefined){
          this.refresher.complete();
        }
      }

    });

  }
/*
  editItem() {
    const prompt = this.alertCtrl.create({
      title: 'ID',
      message: "Change item properties",
      inputs: [
        {
          type: 'text',
          name: 'itemId',
          placeholder: 'id'
        },

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
            console.log("SAVE ITEM ");
            this.item.itemId = data.itemId;
            //item.itemDescription = data.itemDescription;
            this.updateItem(this.item);
          }
        }
      ]
    });
    prompt.present();
  }
  updateItem(item){
    alert(this.item.itemID)



    /*var url = 'https://spillapi.mybluemix.net/items/';
    this.http.get(url, {}, {}).then(data => {
      var result: any = JSON.parse(data.data);
      if (data.status == 200) {

      } else {

      }
    });
  }*/
  editItem2(){
    //var idIsInUserItems= false;
    if(this.itemNAME == undefined || this.itemDescription == undefined ||
      this.itemNAME.length == 0 || this.itemDescription.length == 0||
         this.itemID == null){
          alert("Please fill in all fields")
        }else{
          /*
          var i:number;
          for(i=0:i<=this.userItems.length-1;i++){
              if(this.userItems[i].itemId==this.itemID){
                idIsInUserItems=true;
              }
          }
          if(idIsInUserItems=true){*/
            alert("X")

          //url chanche must be to edit
          var url = 'https://spillapi.mybluemix.net/items/itemId=' + this.itemID +'&itemName'+ this.itemNAME +'&itemDescription=' + this.itemDescription;
          this.http.delete(url, {}, {}).then(data => {
            var result: any = JSON.parse(data.data);
            if (data.status == 200) {
              if(this.refresher != null && this.refresher != undefined){
                this.refresher.complete();
              }
            }
          }).catch(error => {
            alert("Something went wrong... please try again.");
          });
        /*}else{
          alert("this item is not yours");
        }*/

        }
      }



}
