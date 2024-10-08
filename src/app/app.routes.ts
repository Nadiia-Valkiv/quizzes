import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home Page',
    component: HomeComponent,
  },
  {
    path: 'play/:id/:numberOfQuestions',
    title: 'Play',
    loadComponent: () =>
      import('./pages/play/play.component').then((m) => m.PlayComponent),
  },
  {
    path: 'finish',
    title: 'Finish',
    loadComponent: () =>
      import('./pages/finish/finish.component').then((m) => m.FinishComponent),
  },
];
