import { Component } from '@angular/core';
import { Auth } from '@ionic/cloud-angular';
import { NavController, Platform } from 'ionic-angular';
import { 
  GoogleMap, 
  GoogleMapsEvent, 
  GoogleMapsLatLng,
  GoogleMapsMarker,
  GoogleMapsMarkerOptions,
  CameraPosition
} from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public platform: Platform, public navCtrl: NavController, public auth: Auth) {}

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');
    let map = new GoogleMap(element);

    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      map.setClickable(false);
      let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904,-89.3809802);
      let position: CameraPosition = {
        target: ionic,
        zoom: 18,
        tilt: 30
      };

      map.moveCamera(position);

      let markerOptions: GoogleMapsMarkerOptions = {
        position: ionic,
        title: 'Ionic'
      };

      map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });
    })
  }

  logout() {
    console.log('logging out...');
    this.auth.logout();
    window.location.reload();
  }

}
