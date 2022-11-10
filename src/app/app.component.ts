import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Polymetronome', url: '', icon: 'heart' },
    { title: 'Settings', url: 'settings', icon: 'options' },
    { title: 'Guide', url: 'guide', icon: 'book' },
    { title: 'About', url: 'about', icon: 'information' },
  ];
  constructor() {}
}
