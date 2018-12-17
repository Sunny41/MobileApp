import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewActivityPage} from '../new-activity/new-activity';
import { ActivityPage } from '../activity/activity';
import { AddMemberPage } from '../add-member/add-member';



/**
 * Generated class for the GroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {
  root = GroupPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
  }

  openAddActivity(){
    this.navCtrl.push(NewActivityPage);
  }

  openAddMember(){
    this.navCtrl.push(AddMemberPage);
  }

}
