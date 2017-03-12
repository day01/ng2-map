import { Directive, Output, EventEmitter } from '@angular/core';

import { BaseMapDirective } from './base-map-directive';
import { Ng2MapComponent } from '../components/ng2-map.component';

const INPUTS = ['controlPosition', 'controls', 'drawingMode', 'featureFactory', 'style', 'geoJson'];
const OUTPUTS = [
  'addfeature', 'click', 'dblclick', 'mousedown', 'mouseout', 'mouseover',
  'mouseup', 'removefeature', 'removeproperty', 'rightclick', 'setgeometry', 'setproperty'
];

@Directive({
  selector: 'ng2-map > data-layer',
  inputs: INPUTS,
  outputs: OUTPUTS,
})
export class DataLayer extends BaseMapDirective {
  @Output() public addfeature: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public click: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public dblclick: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public mousedown: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public mouseout: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public mouseover: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public mouseup: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public removefeature: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public removeproperty: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public rightclick: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public setgeometry: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js
  @Output() public setproperty: EventEmitter<any> = new EventEmitter(); // generated by ngc-pre-compiler.js

  public controlPosition: any; // generated by ngc-pre-compiler.js
  public controls: any; // generated by ngc-pre-compiler.js
  public drawingMode: any; // generated by ngc-pre-compiler.js
  public featureFactory: any; // generated by ngc-pre-compiler.js
  public style: any; // generated by ngc-pre-compiler.js
  public geoJson: any; // generated by ngc-pre-compiler.js

  @Output() public initialized$: EventEmitter<any> = new EventEmitter();

  constructor(ng2MapComponent: Ng2MapComponent) {
    super(ng2MapComponent, 'Data', INPUTS, OUTPUTS);
  }

  // only called when map is ready
  initialize(): void {
    if (this['geoJson']) {
      console.log('this.geoJson', this['geoJson']);
      this.ng2MapComponent.map.data.loadGeoJson(this['geoJson']);
    } else {
      this.objectOptions = this.optionBuilder.googlizeAllInputs(this.inputs, this);
      console.log(this.mapObjectName, 'initialization objectOptions', this.objectOptions);
      this.ng2MapComponent.map.data.add(this.objectOptions);
    }

    // unlike others, data belongs to map. e.g., map.data.loadGeoJson(), map.data.add()
    this.mapObject = this.ng2MapComponent.map.data;

    // set google events listeners and emits to this outputs listeners
    this.ng2Map.setObjectEvents(this.outputs, this, 'mapObject');

    this.ng2MapComponent.addToMapObjectGroup(this.mapObjectName, this.mapObject);
    this.initialized$.emit(this.mapObject);
  }
}