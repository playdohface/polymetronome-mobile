import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuideComponent } from './component/guide/guide.component';
import { MetronomeComponent } from './component/metronome/metronome.component';
import { SettingsComponent } from './component/settings/settings.component';
import { AboutComponent } from './component/about/about.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'metronome',
    pathMatch: 'full'
  },
  {
    path: 'metronome',
    component: MetronomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsComponent,
    pathMatch: 'full'
  },
  {
    path: 'guide',
    component: GuideComponent ,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent ,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
