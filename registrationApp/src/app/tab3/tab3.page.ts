import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Map, tileLayer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { withModule } from '@angular/core/testing';

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

  cards: any;
  selectedDate: string = "";
  QR: boolean = false;

  constructor(private navCtrl: NavController, private datePicker: DatePicker, private datePipe: DatePipe, public platform: Platform, private router: Router, public navController: NavController, private geolocation: Geolocation, public nativeGeocoder: NativeGeocoder) {
    this.readDirectory()

    this.platform.ready().then(() => {
      this.selectedDate = this.datePipe.transform(new Date(), "dd-MM-yyyy")
    })

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



  readFile(name): Promise<string> {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, successCallback, errorCallback)

      function successCallback(fs) {

        fs.getFile(name, {}, function (fileEntry) {

          fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
              resolve(this.result.toString())
            };

            reader.readAsText(file);

          }, errorCallback);

        }, errorCallback);
      }
      function errorCallback(error) {
        alert("ERROR: " + error.code)
      }
    })
  }


  readDirectory() {
    var self = this;
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, successCallback, errorCallback)

    function successCallback(fs) {
      var directoryReader = fs.createReader();
      directoryReader.readEntries(onSuccessCallback, errorCallback);
    }

    function onSuccessCallback(entries) {
      let promises = [];
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isDirectory) {
          // promises.push(self.readFile(entries[i].name).then(result => {
          //   console.log("Result: " + result)
          //   var theJson = JSON.parse(result);
          //   console.log("Parsed Json name: " + theJson.name);
          //   return theJson;
          // }))

          self.delete(entries[i].name)
        }
      }

      Promise.all(promises).then(results => {
        self.cards = results
        console.log(self.cards)
      })
    }

    function errorCallback(error) {
      alert("ERROR: " + error.code)
    }
  }



  delete(name) {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, successCallback, errorCallback)

    function successCallback(fs) {
      fs.getFile(name, { create: false }, function (fileEntry) {
        fileEntry.remove(function (file) {
          alert("file removed: " + name);
        }, function (error) {
          alert("error occurred: " + error.code);
        }, function () {
          alert("file does not exist");
        });
      });
    }
    function errorCallback(error) {
      alert("ERROR: " + error.code)
    }
  }
}
