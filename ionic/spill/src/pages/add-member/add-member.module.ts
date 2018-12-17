import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMemberPage } from './add-member';

@NgModule({
  declarations: [
    AddMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMemberPage),
  ],
})
export class AddMemberPageModule {}
