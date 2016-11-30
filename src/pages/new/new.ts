import { Component } from '@angular/core';
import { Database } from '@ionic/cloud-angular';
import { Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'new.html'
})
export class NewPage {
  name: string;
  desc: string;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public db: Database
  ) { 
    this.db.connect();
    console.log(this.params);
  }

  save() {
    let location = {
      lat: this.params.get('lat'),
      lng: this.params.get('lng'),
      name: this.name,
      desc: this.desc
    };
    this.db.collection('locations').store(location);
    this.clear();
    this.dismiss();
  }

  clear() {
    this.name = "";
    this.desc = "";
  }

  dismiss() {
    this.viewCtrl.dismiss();
  };
}