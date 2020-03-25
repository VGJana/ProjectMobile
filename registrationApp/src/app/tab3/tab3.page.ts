import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Map, tileLayer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  locatie: string;
  map: Map;
  newMarker: any;
  address: string[];
  lat: number;
  lng: number;

  cards: Object[];
  data: string;
  selectedDate: string = "";
  QR: boolean = false;
  
  constructor(private navCtrl: NavController, private datePicker: DatePicker, private datePipe: DatePipe, public platform: Platform, private router: Router, public navController: NavController, private geolocation: Geolocation, public nativeGeocoder: NativeGeocoder) {
    this.platform.ready().then(() => {
      this.selectedDate = this.datePipe.transform(new Date(), "dd-MM-yyyy")
    })
    this.data = require('../data/data.json');
    this.cards = JSON.parse(JSON.stringify(this.data));

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

      //this.lat = 51.238048
      //this.lng = 4.526831

      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
      
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

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = new Map("mapId").setView([this.lat, this.lng], 30);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(this.map);
  }

  ngOnInit() {

  }

  goBack() {
    this.navCtrl.pop();
  }

  showDatepicker() {
    var options = {
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
    }
    this.datePicker.show(options).then((date) => {
      this.selectedDate = this.datePipe.transform(date, "dd-MM-yyyy")
    })
  }
  ngAfterViewInit() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }
}
