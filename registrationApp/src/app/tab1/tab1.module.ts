import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    NgxQRCodeModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
  ],
  exports: [
  ],
  declarations: [
    Tab1Page
  ]
})
export class Tab1PageModule {}
