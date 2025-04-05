import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent() {
        return import('./features/document-registration/document-registration.component').then(
          (m) => m.DocumentRegistrationComponent
        );
    },
  }
];
