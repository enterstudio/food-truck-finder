import { Component } from '@angular/core';
import { Auth, Database } from '@ionic/cloud-angular';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { 
  GoogleMap, 
  GoogleMapsEvent, 
  GoogleMapsLatLng,
  GoogleMapsMarker,
  GoogleMapsMarkerOptions,
  CameraPosition
} from 'ionic-native';
import { NewPage } from '../new/new';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private map: GoogleMap;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public auth: Auth,
    public db: Database,
    public modalCtrl: ModalController
  ) {
    this.db.connect();
    this.db.collection('locations').watch().subscribe((locations) => {
      console.log(locations);
    }, (error) => {
      console.error(error);
    })
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');
    this.map = new GoogleMap(element);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.setClickable(false);
      let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);
      let position: CameraPosition = {
        target: ionic,
        zoom: 18,
        tilt: 30
      };

      this.map.moveCamera(position);

      let markerOptions: GoogleMapsMarkerOptions = {
        position: ionic,
        title: 'Ionic',
        snippet: 'Ionic is the beautiful, free and open source mobile SDK for developing native and progressive web apps with ease.'
      };

      this.map.addMarker(markerOptions);
    });

    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((event) => {
      this.openCreateModal(event.lat, event.lng);
    }, (error) => {
      console.error(error);
    });

    this.map.on(GoogleMapsEvent.MARKER_CLICK).subscribe((event) => {
      console.log(event);
    }, (error) => {
      console.error(error);
    })
  }

  setClickable(clickable: boolean) {
    this.map.setClickable(clickable);
  }

  openCreateModal(lat: number, lng: number) {
    this.setClickable(false);
    let modal = this.modalCtrl.create(NewPage, {lat: lat, lng: lng});
    modal.present();
  }

  logout() {
    console.log('logging out...');
    this.auth.logout();
    window.location.reload();
  }

}
