import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-handtekening-pagina',
  templateUrl: './handtekening-pagina.page.html',
  styleUrls: ['./handtekening-pagina.page.scss'],
})
export class HandtekeningPaginaPage implements OnInit, AfterViewInit {
  @ViewChild('sPad', { static: true }) signatureElement;
  signaturePad: any;

  constructor(public navController: NavController) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signatureElement.nativeElement);
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  download(dataURL, filename) {
    if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
      window.open(dataURL);
    } else {
      const blob = this.dataURLToBlob(dataURL);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    }
  }

  dataURLToBlob(dataURL) {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  save() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL();
      this.download(dataURL, 'signature.png'); //dit regeltje verdwijnt en wordt de code die we gebruiken om de dataURL weg te schrijven naar de databank
    }
  }

  terug() {
    this.navController.navigateForward('/');
  }


}
