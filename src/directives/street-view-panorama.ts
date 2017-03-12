import { Directive, Output, EventEmitter } from '@angular/core';

import { BaseMapDirective } from './base-map-directive';
import { Ng2MapComponent } from '../components/ng2-map.component';

const INPUTS = [
  'selector', 'options',
  'addressControl', 'addressControlOptions', 'clickToGo', 'disableDefaultUI', 'disableDoubleClickZoom',
  'enableCloseButton', 'fullscreenControl', 'fullscreenControlOptions', 'imageDateControl', 'linksControl',
  'motionTracking', 'motionTrackingControl', 'panControl', 'panControlOptions', 'pano',
  'position', 'pov', 'scrollwheel', 'showRoadLabels', 'visible', 'zoomControl', 'zoomControlOptions'
];
const OUTPUTS = [
  'closeclick', 'pano_changed', 'position_changed', 'pov_changed', 'resize', 'status_changed',
  'visible_changed', 'zoom_changed'
];

@Directive({
  selector: 'ng2-map > street-view-panorama',
  inputs: INPUTS,
  outputs: OUTPUTS,
})
export class StreetViewPanorama extends BaseMapDirective implements OnDestroy {
  @Output() public closeclick: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public pano_changed: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public position_changed: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public pov_changed: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public resize: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public status_changed: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public visible_changed: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public zoom_changed: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js

  public selector: any; // generated by ngc-pre-compiler.js
  public options: any; // generated by ngc-pre-compiler.js
  public addressControl: any; // generated by ngc-pre-compiler.js
  public addressControlOptions: any; // generated by ngc-pre-compiler.js
  public clickToGo: any; // generated by ngc-pre-compiler.js
  public disableDefaultUI: any; // generated by ngc-pre-compiler.js
  public disableDoubleClickZoom: any; // generated by ngc-pre-compiler.js
  public enableCloseButton: any; // generated by ngc-pre-compiler.js
  public fullscreenControl: any; // generated by ngc-pre-compiler.js
  public fullscreenControlOptions: any; // generated by ngc-pre-compiler.js
  public imageDateControl: any; // generated by ngc-pre-compiler.js
  public linksControl: any; // generated by ngc-pre-compiler.js
  public motionTracking: any; // generated by ngc-pre-compiler.js
  public motionTrackingControl: any; // generated by ngc-pre-compiler.js
  public panControl: any; // generated by ngc-pre-compiler.js
  public panControlOptions: any; // generated by ngc-pre-compiler.js
  public pano: any; // generated by ngc-pre-compiler.js
  public position: any; // generated by ngc-pre-compiler.js
  public pov: any; // generated by ngc-pre-compiler.js
  public scrollwheel: any; // generated by ngc-pre-compiler.js
  public showRoadLabels: any; // generated by ngc-pre-compiler.js
  public visible: any; // generated by ngc-pre-compiler.js
  public zoomControl: any; // generated by ngc-pre-compiler.js
  public zoomControlOptions: any; // generated by ngc-pre-compiler.js

  @Output() public initialized$: EventEmitter<any> = new EventEmitter();

  constructor(ng2MapComp: Ng2MapComponent) {
    super(ng2MapComp, 'StreetViewPanorama', INPUTS, OUTPUTS);
  }

  // only called when map is ready
  initialize(): void {
    this.objectOptions = this.optionBuilder.googlizeAllInputs(this.inputs, this);
    console.log(this.mapObjectName, 'initialization objectOptions', this.objectOptions);

    let element: HTMLElement;
    if (this.objectOptions.selector) {
      // noinspection TypeScriptValidateTypes
      element = document.querySelector(this['selector']);
      delete this.objectOptions.selector;
    } else {
      element = this.ng2MapComponent.el;
    }

    // will be set after geocoded
    typeof this.objectOptions.position === 'string' && (delete this.objectOptions.position);

    this.mapObject = new google.maps[this.mapObjectName](element, this.objectOptions);
    this.mapObject['mapObjectName'] = this.mapObjectName;
    this.mapObject['ng2MapComponent'] = this.ng2MapComponent;

    // set google events listeners and emits to this outputs listeners
    this.ng2Map.setObjectEvents(this.outputs, this, 'mapObject');

    this.ng2MapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
    this.initialized$.emit(this.mapObject);
  }

  // When destroyed, remove event listener, and delete this object to prevent memory leak
  ngOnDestroy() {
    if (this.ng2MapComponent.el) {
      OUTPUTS.forEach(output => google.maps.event.clearListeners(this.mapObject, output));
    }
  }
}