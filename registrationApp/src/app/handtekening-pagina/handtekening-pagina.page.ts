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
  dateNow;
  signaturePad: any;
  sNummer: string;
  locatie: string;
  constructor(public navController: NavController) { }

  ngOnInit() {
    var aParam = window.location.pathname.split('/');
    this.locatie = aParam[2];
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signatureElement.nativeElement);
  }

  clear() {
    this.signaturePad.clear();
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
    //save wordt nog aangepast met ander file system

    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      this.createFile()
    }
  }

  terug() {
    this.navController.pop();
  }


  getDate() {
    this.dateNow = new Date();
    let currentdate = new Date()
    var datetime = currentdate.getDate() +""
      + (currentdate.getMonth() + 1)+""
      + currentdate.getFullYear()+""
      + currentdate.getHours()+""
      + currentdate.getMinutes()+""
      + currentdate.getSeconds();
    return datetime;
  }

  createFile() {
    var aFileName;
    var theId = this.getDate();
     aFileName = theId + ".json"


    var self = this;

    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, successCallback, errorCallback)

    function successCallback(fs) {
      fs.getFile(aFileName, { create: true, exclusive: true }, function (fileEntry) {
        var input;
        const dataURL = self.signaturePad.toDataURL()

        input = {
          id:theId ,
          name: self.sNummer,
          date:self.dateNow.toLocaleDateString(),
          time: self.dateNow.toLocaleTimeString() ,
          location: self.locatie ,
          signatureURL: dataURL
        };
          fileEntry.createWriter(function (fileWriter) {
          fileWriter.onwriteend = function (e) {
            console.log("Wrote file")
          };
          fileWriter.onerror = function (e) {
            alert('Write failed: ' + e.toString());
          };

          var blob = new Blob([JSON.stringify(input)], { type: 'text/plain' });
          fileWriter.write(blob);
        }, errorCallback);
      }, errorCallback);
    }

    function errorCallback(error) {
      alert("ERROR: " + error.code)
    }
  }
}
