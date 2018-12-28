import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewActivityPage} from '../new-activity/new-activity';
import { ActivityPage } from '../activity/activity';
import { AddMemberPage } from '../add-member/add-member';


@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {
  group:any;
  root = GroupPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(navParams.get('data')!=null){
      console.log(navParams.get('data'));
      this.group = navParams.get('data');
    }
    console.log('constructor');
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
