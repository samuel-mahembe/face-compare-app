import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as faceapi from 'face-api.js';
import {FaceDetectorService} from "../../../services/face-detector.service";

@Component({
  selector: 'app-auto-capture',
  templateUrl: './auto-capture.component.html',
  styleUrls: ['./auto-capture.component.css']
})
export class AutoCaptureComponent implements AfterViewInit{
  @ViewChild('video') videoRef!: ElementRef;
  detectionRunning = false;
  faceValidation = false;
  capturedFiles: { selfie?: File; idface?: File } = {};
  constructor(private faceService: FaceDetectorService) {
  }

  async ngAfterViewInit() {

    await this.loadModels();
    console.log('Models loaded');
    console.log('starting camera');
    this.startCamera();
  }

  async loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => {
      this.videoRef.nativeElement.srcObject = stream;
      this.detectFaces();
    });
  }

  async detectFaces() {
    console.log('detecting faces');
    this.detectionRunning = true;

    const interval = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        this.videoRef.nativeElement,
        new faceapi.TinyFaceDetectorOptions()
      );
      console.log('now detecting faces');
      if (detections.length >= 2) {
        clearInterval(interval);
        console.log('detected faces');
        this.captureFrameAndCropFaces(detections);
      }
    }, 100); // check every 100ms
  }


  captureFrameAndCropFaces(detections: faceapi.FaceDetection[]) {
    const video: HTMLVideoElement = this.videoRef.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    detections.forEach((det, i) => {
      console.log('face detected', det);
      const { x, y, width, height } = det.box;
// Add padding to increase crop size (e.g., 30% larger)
      const padding = {
        x: width * 0.4,
        y: height * 0.4
      };

      // Calculate new coordinates with padding
      const newX = Math.max(0, x - padding.x / 2);
      const newY = Math.max(0, y - padding.y / 2);
      const newWidth = Math.min(canvas.width - newX, width + padding.x);
      const newHeight = Math.min(canvas.height - newY, height + padding.y);

      const cropped = ctx.getImageData(newX, newY, newWidth, newHeight);

      const faceCanvas = document.createElement('canvas');
      faceCanvas.width = width;
      faceCanvas.height = height;
      faceCanvas.getContext('2d')!.putImageData(cropped, 0, 0);

      const dataURL = faceCanvas.toDataURL('image/jpeg');
      const blob = this.dataURLtoBlob(dataURL);
      const file = new File([blob], `${i === 0 ? 'selfie' : 'idface'}.jpg`, { type: 'image/jpeg' });

      this.capturedFiles[i === 0 ? 'selfie' : 'idface'] = file;
    });
    console.log('captured files', this.capturedFiles);
    // Send only when both are captured
    if (this.capturedFiles.selfie && this.capturedFiles.idface) {
      this.faceValidation = true;
      this.faceService.compareFaces(this.capturedFiles.selfie, this.capturedFiles.idface)
        .subscribe({
          next: (res) => {
            console.log('Face match result:', res);
          },
          error: (err) => {
            console.error('Upload failed:', err);
          }
        });
    }
  }

  uploadFace(type: 'selfie' | 'idface', dataUrl: string) {
    console.log('uploading face');
    const blob = this.dataURLtoBlob(dataUrl);
    const file = new File([blob], `${type}.jpg`, { type: 'image/jpeg' });
    // send file via your existing service
    this.faceService.compareFaces(file, file).subscribe(res => {
      console.log('response', res);
    });
  }

  dataURLtoBlob(dataURL: string): Blob {
    const byteString = atob(dataURL.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: 'image/jpeg' });
  }
}
