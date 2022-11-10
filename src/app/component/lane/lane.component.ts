/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';

import { Sound } from '../../types/sound';
import { AudioEngineService } from '../../service/audio-engine.service';
import { SoundEvent } from '../../types/sound-event';
import { v4 } from 'uuid';
import { SoundProviderService } from '../../service/sound-provider.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.css'],
})
export class LaneComponent implements OnInit, OnChanges, OnDestroy {

  @Input() subdivisions!: number;
  @Input() activedefault!: boolean;

  @Output() delete$ = new EventEmitter<boolean>();

  public soundChoice = new FormGroup({
    soundSelect: new FormControl(),
    playEvery: new FormControl<number>(1)
  });

  public moreoptions = false;
  buttons = [{active: false, current : false}];

  private _sound: Sound;
  private _soundList: Sound[];
  private _globalId = v4();
  private _volumeNode: GainNode;
  private _playEvery = 1;

  private soundchoicesubscription!: Subscription;

  constructor(
    private audioEngine: AudioEngineService,
    public soundPool: SoundProviderService
    ) {
      this._volumeNode = this.audioEngine.audioContext.createGain();
      this._volumeNode.gain.setValueAtTime(0.5,0);
      this._volumeNode.connect(this.audioEngine.mainOut);

      this._soundList = this.soundPool.makeSoundInstances();
      this._sound = this._soundList[0];
      this._sound.outputNode = this._volumeNode;
    }

    public get soundList(){
      return this._soundList;
    }

  ngOnInit(): void {
    this.makeButtons();
    this.soundchoicesubscription = this.soundChoice.valueChanges.subscribe((newVal) => {
      this._playEvery = newVal.playEvery ? newVal.playEvery : this._playEvery;
      this.selectSound(newVal.soundSelect);
    });
    this.soundChoice.setValue({soundSelect: this._sound, playEvery: 1});
  }

  ngOnChanges(): void {
  }

  ngOnDestroy(){
    this.soundchoicesubscription.unsubscribe();
  }

  public deleteMe(): void {
    for (let i = 0; i < this.buttons.length; i++) {
      this.audioEngine.removeSoundEvent(this._getButtonId(i));
    }
    this.delete$.emit(true);
  }

  public toggleOptions(): void{
    this.moreoptions = !this.moreoptions;

  }

  public setVolume(newVolume: string): void{
    this._volumeNode.gain.setValueAtTime(parseInt(newVolume, 10)/100,0);
  }

  public selectSound(newSound: Sound): void{
    this._sound = newSound;
    this._sound.outputNode = this._volumeNode;

    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].active === true) {
        this.audioEngine.removeSoundEvent(this._getButtonId(i));
        const newSoundEvent = new SoundEvent(this._getButtonId(i), this._sound ,i/this.subdivisions, this._playEvery);
        this.audioEngine.addSoundEvent(newSoundEvent);
      }
    }
  }

  makeButtons(): void{
    for (let i = 0; i < this.subdivisions; i++ )
    {
      this.buttons[i] = {active: this.activedefault, current: false};
      this.buttonHandler(i);
    }
  }

  buttonHandler(id: number): void {
    if (this.buttons[id].active === false) {
      this.buttons[id].active = true;
      const newSound = new SoundEvent(this._getButtonId(id), this._sound ,id/this.subdivisions,this._playEvery);
      this.audioEngine.addSoundEvent(newSound);

    } else {
      this.buttons[id].active = false;
      this.audioEngine.removeSoundEvent(this._getButtonId(id));
    }
  }

  private _getButtonId(id: number): string {
    return this._globalId + '_' + id.toString();
  }
}

