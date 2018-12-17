import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import {NewGroupPage} from '../pages/new-group/new-group';
import {GroupPage} from '../pages/group/group';
import { ProfilePage } from '../pages/settings/profile/profile';
import { AppSettingsPage } from '../pages/settings/app-settings/app-settings';
import { AccountPage } from '../pages/settings/account/account';
import {ActivityPage} from '../pages/activity/activity';
import {NewActivityPage} from '../pages/new-activity/new-activity';
import {AddMemberPage} from '../pages/add-member/add-member';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage,
    LoginPage,
    SettingsPage,
    GroupPage,
    NewGroupPage,
    ProfilePage,
    AppSettingsPage,
    AccountPage,
    ActivityPage,
    NewActivityPage,
    AddMemberPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    LoginPage,
    SettingsPage,
    GroupPage,
    NewGroupPage,
    ProfilePage,
    AppSettingsPage, 
    AccountPage,
    ActivityPage,
    NewActivityPage,
    AddMemberPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
