import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { Platform, NavParams, ViewController, Events } from 'ionic-angular';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string;
  password: string;
  username: string;
  loginErrors: string[] = [];

  constructor(
    public auth: Auth,
    public user: User,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public events: Events
  ) {
    console.log("HELLO LOGIN");
  }

  signup() {
    this.loginErrors = [];
    let creds: UserDetails = {'email': this.email, 'password': this.password};
    if (this.username) {
      creds.username = this.username;
    }
    let errorMap = {
      'conflict_email': 'Email already exists',
      'required_email': 'Email required',
      'required_password': 'Password required',
      'invalid_email': 'Invalid email address',
      'conflict_username': 'Username already exists'
    }

    this.auth.signup(creds).then(() => {
      this.login();
    }, (err: IDetailedError<string[]>) => {
      console.log(err);
      for (let e of err.details) {
        if (e in errorMap) {
          this.loginErrors.push(errorMap[e]);
        } else {
          this.loginErrors.push("Unknown error, try again later");
        }
      }
    });
  };

  login() {
    this.loginErrors = [];
    let creds: UserDetails = {'email': this.email, 'password': this.password};
    if (this.username) {
      creds.username = this.username;
    }
    this.auth.login('basic', creds, {'remember': true}).then(() => {
      this.events.publish('make_clickable');
      this.clearCreds();
      this.dismiss();
    }, (err: IDetailedError<string[]>) => {
      this.loginErrors.push("Invalid email or password");
    });
  };

  logout() {
    this.auth.logout();
  };

  log() {
    console.log(this.email);
    console.log(this.password);
  };

  clearCreds() {
    this.email = "";
    this.password = "";
  }

  dismiss() {
    this.viewCtrl.dismiss();
  };
}