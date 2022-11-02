import { catchError } from 'rxjs/operators';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  EventDetailDto,
  FileResponse,
  UpdateEventCommand,
} from 'src/app/membermanager-api';
import { EventFormDialogData } from '../event-form/event-form.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-code-dialog',
  templateUrl: './event-code-dialog.component.html',
  styleUrls: ['./event-code-dialog.component.scss'],
})
export class EventCodeDialogComponent implements OnInit {
  qrCodeURL: string = '';
  event: EventDetailDto;

  constructor(
    public dialogRef: MatDialogRef<EventCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventFormDialogData
  ) {
    this.event = this.data.edit;
  }

  ngOnInit(): void {
    this.qrCodeURL = `${location.origin}/landingpage?eventid=${this.event.id}&eventcode=${this.event.secretKey}`;
  }

  downloadQRCode() {}

  saveAsImage(parent: any) {
    let parentElement = null;

    // fetches base 64 data from image
    // parentElement contains the base64 encoded image src
    // you might use to store somewhere
    parentElement = parent.qrcElement.nativeElement.querySelector('img').src;

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement);
      // saves as image
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      // name of the file
      link.download = 'Qrcode';
      link.click();
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(';base64,');
    // hold the content type
    const imageType = parts[0].split(':')[1];
    // decode base64 string
    const decodedData = window.atob(parts[1]);
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }

  onSubmit(event: UpdateEventCommand) {
    console.log("Werde ausgeführt!");
    
    this.dialogRef.close(event);
  }
}
