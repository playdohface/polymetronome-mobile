/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[laneView]'
})
export class LaneViewDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
