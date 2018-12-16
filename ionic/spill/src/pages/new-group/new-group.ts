import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupPage } from '../group/group';

/**
 * Generated class for the NewGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-group',
  templateUrl: 'new-group.html',
})
export class NewGroupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navCtrl=navCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewGroupPage');
  }

  addGroup(){
    this.navCtrl.push(GroupPage);
  }

}
