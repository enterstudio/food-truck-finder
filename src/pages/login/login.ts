import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    console.log("HELLO LOGIN");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}