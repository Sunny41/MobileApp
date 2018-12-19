import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupPage } from '../group/group';


@Component({
  selector: 'page-new-group',
  templateUrl: 'new-group.html',
})
export class NewGroupPage {

  name:string;
  description:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl=navCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewGroupPage');
  }

  addNewGroup(){
    var group = {name:this.name, description:this.description};
    this.navCtrl.push(GroupPage, {data:group});
  }

}
