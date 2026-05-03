import { Routes } from '@angular/router';
import { InicioComponente } from './components/inicio/inicio.componente';
import { DetalleEquipoComponente } from './components/detalle-equipo/detalle-equipo.componente';

export const routes: Routes = [
  { path: '', component: InicioComponente },
  { path: 'equipo/:id', component: DetalleEquipoComponente },
  { path: '**', redirectTo: '' }
];
