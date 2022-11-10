import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GuideComponent } from './component/guide/guide.component';
import { SettingsComponent } from './component/settings/settings.component';
import { MetronomeComponent } from './component/metronome/metronome.component';
import { AboutComponent } from './component/about/about.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaneComponent } from './component/lane/lane.component';
import { LaneViewDirective } from './directive/lane-view.directive';
import { TapTempoComponent } from './component/tap-tempo/tap-tempo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AudioEngineService } from './service/audio-engine.service';
import { FileLoaderService } from './service/file-loader.service';
import { SoundProviderService } from './service/sound-provider.service';

@NgModule({
  declarations: [
    AppComponent,
    GuideComponent,
    SettingsComponent,
    MetronomeComponent,
    AboutComponent,
    HeaderComponent,
    LaneComponent,
    LaneViewDirective,
    TapTempoComponent,
],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AudioEngineService, FileLoaderService, SoundProviderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
