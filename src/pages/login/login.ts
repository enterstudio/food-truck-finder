import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  creds: UserDetails = {
    'email': '',
    'password': ''
  };
  loginErrors: string[];

  constructor(
    public auth: Auth,
    public user: User,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    console.log("HELLO LOGIN");
  }

  signup() {
    this.auth.signup(this.creds).then(() => {
      console.log(this.user);
    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        this.loginErrors.push(e);
      }
    });
  }

  login() {
    this.auth.login('basic', this.creds).then(() => {
      console.log(this.user);
    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        this.loginErrors.push(e);
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}