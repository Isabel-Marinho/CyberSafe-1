import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'trilha/:id',
    loadComponent: () => import('./modules/trilhas/ui/trilha.page').then((m) => m.TrilhaPage),
  },
  {
    path: 'video/:id',
    loadComponent: () => import('./modules/videos/ui/video.page').then((m) => m.VideoPage),
  },
];
