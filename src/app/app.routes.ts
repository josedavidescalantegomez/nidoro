import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'presupuesto',
        loadComponent: () => import('./presupuesto/presupuesto.component').then(m => m.PresupuestoComponent)
      },
      {
        path: 'deudas',
        loadComponent: () => import('./deudas/deudas.component').then(m => m.DeudasComponent)
      }
    ]
  }
];
