import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private screenOrientation: ScreenOrientation) {
    this.lockScreenRotation();
  }

  // set to landscape
  lockScreenRotation() {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    } catch (error) {
      console.error(error);
    }
  }


}
