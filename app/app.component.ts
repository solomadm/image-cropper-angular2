import {Component, ViewChild, Type} from '@angular/core';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

@Component({
    selector: 'my-app',
    template: `
    <div>
        <div class="pull-left">
            <h3>Sample cropper 1</h3>
            <img-cropper [image]="data1" [settings]="cropperSettings1" (onCrop)="cropped($event)"></img-cropper>
            <br>
            <span class="result" *ngIf="data1.image" >
                <img [src]="data1.image" [width]="cropperSettings1.croppedWidth" [height]="cropperSettings1.croppedHeight">
            </span>
        </div>



        <div class="pull-left">
            <h3>
              Sample cropper 2
               <div class="file-upload">
                  <span class="text">upload</span>
                  <input id="custom-input" type="file" (change)="fileChangeListener($event)">
              </div>
            </h3>
           

            <img-cropper #cropper [image]="data2" [settings]="cropperSettings2"></img-cropper>
            <br>
            <span class="result rounded" *ngIf="data2.image" >
                <img [src]="data2.image" [width]="cropperSettings2.croppedWidth" [height]="cropperSettings2.croppedHeight">
            </span>
        </div>
    </div>`,
    styles: [`
        h3 {
          padding-bottom: 20px;
          border-bottom: 1px solid #a0a0a0;
        }
        
        h4 {
          padding-bottom: 20px;
          padding-top: 20px;
          border-top: 1px solid #a0a0a0;
        }
    
        .result {
            margin-top: 30px;
            border: 1px solid rgba(125,125,125,0.6);
            display: inline-block;
            padding: 1px;
        }

        .result.rounded > img {
            border-radius: 100px;
        }

        .pull-left {
            min-width: 400px;
            float: left;
            margin: 10px;
            padding: 10px;
            background-color: rgba(0,0,0,0.05);
        }
        
        .file-upload {
          height: 25px;
          width: 100px;
          position: relative;
          border-radius: 3px;
          display: flex;
          justify-content: center;
          align-items: center;
          float: right;
          
          border: 1px solid #FFF;
          overflow: hidden;
          background-image: linear-gradient(to bottom, #2590EB 50%, #FFFFFF 50%);
          background-size: 100% 200%;
          transition: all 1s;
          color: #FFF;
          font-size: 10px;
        }
        
        .file-upload:hover {
          background-position: 0 -100%;
          color: #2590Eb;
        }
        
        .text {
          font-size: 14px;
        }
        
        input[type='file'] {
          height: 25px;
          width: 100px;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          cursor: pointer;
        }
    `],
    directives: [ImageCropperComponent]
})
export class AppComponent extends Type {
     //Cropper 1 data
    data1:any;
    cropperSettings1:CropperSettings;

    //Cropper 2 data
    data2:any;
    cropperSettings2:CropperSettings;
    @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

    constructor() {
        super();

          this.cropperSettings1 = new CropperSettings();
        this.cropperSettings1.width = 200;
        this.cropperSettings1.height = 200;

        this.cropperSettings1.croppedWidth = 200;
        this.cropperSettings1.croppedHeight = 200;

        this.cropperSettings1.canvasWidth = 500;
        this.cropperSettings1.canvasHeight = 300;

        this.cropperSettings1.minWidth = 100;
        this.cropperSettings1.minHeight = 100;

        this.cropperSettings1.rounded = false;

        this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

        this.data1 = {};


        //Cropper settings 2
        this.cropperSettings2 = new CropperSettings();
        this.cropperSettings2.width = 200;
        this.cropperSettings2.height = 200;
        this.cropperSettings2.keepAspect = false;

        this.cropperSettings2.croppedWidth = 200;
        this.cropperSettings2.croppedHeight = 200;

        this.cropperSettings2.canvasWidth = 500;
        this.cropperSettings2.canvasHeight = 300;

        this.cropperSettings2.minWidth = 100;
        this.cropperSettings2.minHeight = 100;

        this.cropperSettings2.rounded = true;
        this.cropperSettings2.minWithRelativeToResolution = false;

        this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings2.noFileInput = true;

        this.data2 = {};

    }

    cropped(bounds:Bounds) {
        //console.log(bounds);
    }

    /**
     * Used to send image to second cropper
     * @param $event
     */
    fileChangeListener($event) {
        var image:any = new Image();
        var file:File = $event.target.files[0];
        var myReader:FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent:any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);

        };

        myReader.readAsDataURL(file);
    }
}
