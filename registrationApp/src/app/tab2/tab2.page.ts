import { Component } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
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
  constructor(private router: Router, public navController: NavController, private geolocation: Geolocation, private screenOrientation: ScreenOrientation, public nativeGeocoder: NativeGeocoder) {
    this.lockScreenRotation();

    this.geolocation.getCurrentPosition(
      {
        maximumAge: 1000, timeout: 5000,
        enableHighAccuracy: true
      }
    ).then((resp) => {
      alert(JSON.stringify(resp.coords));

      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
      
      this.nativeGeocoder.reverseGeocode(this.lat, this.lng).then((results) => {
      this.locatie = JSON.stringify(results[0]);
      })

    }, er => {
      alert('Can not retrieve Location')
    }).catch((error) => {
      alert('Error getting location - ' + JSON.stringify(error))
    });
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = new Map("mapId").setView([this.lat,this.lng], 30);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(this.map);
  }

  lockScreenRotation() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch (error) {
      console.error(error);
    }
  }

  bevestigingsKnop() {
    this.navController.navigateForward('/handtekening/'+ this.locatie);
  } 

}