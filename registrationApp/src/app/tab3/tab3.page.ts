import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  cards: Object[];
  data: string;
  selectedDate: string = "";
  QR: boolean = false;
  constructor(
    private navCtrl: NavController,
    private datePicker: DatePicker,
    private datePipe: DatePipe,
    public platform: Platform,
  ) {
    this.platform.ready().then(() => {
      this.selectedDate = this.datePipe.transform(new Date(), "dd-MM-yyyy")
    })
    this.data = require('../data/data.json');
    this.cards = JSON.parse(JSON.stringify(this.data));
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
