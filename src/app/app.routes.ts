import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';
import { FinishComponent } from './pages/finish/finish.component';

export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    component: HomeComponent,
  },
  {
    path: 'quiz',
    title: 'App Play Page',
    component: PlayComponent,
  },
  {
    path: 'finish',
    title: 'App Finish Page',
    component: FinishComponent,
  },
];
