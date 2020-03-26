import { Component } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { logging } from 'protractor';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  locatie: string;
  map: Map;
  newMarker: any;
  address: string[];
  lat: number;
  lng: number;
  constructor(private router: Router, public navController: NavController, private geolocation: Geolocation, public nativeGeocoder: NativeGeocoder) {

    this.geolocation.getCurrentPosition(
      {
        maximumAge: 1000, timeout: 5000,
        enableHighAccuracy: true
      }
    ).then((resp) => {
      alert(JSON.stringify(resp.coords));

      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };

      this.lat = 51.238048
      this.lng = 4.526831

      // this.lat = resp.coords.latitude
      // this.lng = resp.coords.longitude

      this.nativeGeocoder.reverseGeocode(this.lat, this.lng, options)
        .then((result: NativeGeocoderResult[]) => {
          console.log(JSON.stringify(result[0]))
          this.locatie = result[0].countryCode + "&" + result[0].locality + "&" + result[0].thoroughfare + "&" + result[0].subThoroughfare
        })
        .catch((error: any) => console.log(error));

    }, er => {
      alert('Can not retrieve Location')
    }).catch((error) => {
      alert('Error getting location - ' + JSON.stringify(error))
    });
  }

  goBack() {
    this.navController.navigateForward('');
  }

  bevestigingsKnop() {
    this.navController.navigateForward('/handtekening/' + this.locatie);
  }

}