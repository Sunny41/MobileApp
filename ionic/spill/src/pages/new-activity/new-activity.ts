import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GroupPage} from '../group/group';


@Component({
  selector: 'page-new-activity',
  templateUrl: 'new-activity.html',
})
export class NewActivityPage {
  member:string;
  membersToAdd = [];
  allMembers=[
    {id:1, username:"max"},
    {id:2, username:"lisa"},
    {id:3, username:"jannik"},
    {id:4, username:"sonja"}
  ];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewActivityPage');
  }

  onInput(event){
    var temp = this.allMembers.find(x=>x.username == this.member)
    if(temp){
      this.membersToAdd.push(temp);
      this.member='';
    }else{
      //show error
    }
    console.log(this.member);
    console.log("Input event");
  }

  delMember(id){
    var index = this.membersToAdd.indexOf(this.membersToAdd.find(x => x.id == id));
    console.log(index);
    this.membersToAdd.splice(index);
    //console.log(id);
  }
  
  addActivity(){


    this.navCtrl.pop();
  }

}
