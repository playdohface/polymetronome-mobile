import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

import { SoundEvent } from '../../types/sound-event';
import { LaneViewDirective } from '../../directive/lane-view.directive';
import { LaneComponent } from '../lane/lane.component';
import { AudioEngineService } from '../../service/audio-engine.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.scss', './metronome.component.css']
})
export class MetronomeComponent implements OnInit {
  @ViewChild(LaneViewDirective, {static: true}) laneViews!: LaneViewDirective;
  audioContext!: AudioContext;

  public volumeSlider = 75;
  public tempoSlider = 120;

  constructor(public ac: AudioEngineService) {
    this.audioContext = ac.audioContext;
  }

  ngOnInit(): void {
    this.addNewLane('4',false);
  }

  setVolume(newVolume: string): void {

    this.ac.mainVolume = parseInt(newVolume,10)/100;
  }

  tapTempo(newTempo: number){
    if (newTempo < 30 || newTempo > 400) { return; }
    this.ac.bpm = Math.round(newTempo);
    this.tempoSlider = Math.round(newTempo);
  }

  setBpm(newBpm: string){
    this.ac.bpm = parseInt(newBpm,10);
  }

  addNewLane(subdivs: string, activedefault: boolean = true){
    const subdivsnum = parseInt(subdivs,10);
    const viewContainerRef = this.laneViews.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(LaneComponent);
    componentRef.instance.subdivisions = subdivsnum;
    componentRef.instance.activedefault = activedefault;
    componentRef.instance.delete$.subscribe((e) => {
      if (e) {
        componentRef.destroy();
      }
    });
  }
}
