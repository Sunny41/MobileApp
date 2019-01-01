import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {
  member:string;
  allGroupMembers=[
    {id:1, username:"max"},
    {id:2, username:"lisa"},
    {id:3, username:"jannik"},
    {id:4, username:"sonja"}
  ];
  checkedMembers:boolean[];
  assetMembers=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.checkedMembers= new Array(this.allGroupMembers.length);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPostPage');
  }

  addNewAsset(){
    
   console.log(this.checkedMembers);
   this.navCtrl.pop();
  }
}
