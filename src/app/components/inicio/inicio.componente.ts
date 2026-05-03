import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasificacionComponente } from '../clasificacion/clasificacion.componente';
import { FormularioPartidoComponente } from '../formulario-partido/formulario-partido.componente';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, ClasificacionComponente, FormularioPartidoComponente],
  template: `
    <div class="dashboard-layout">
      <main class="main-content">
        <app-clasificacion></app-clasificacion>
      </main>
      <aside class="sidebar">
        <app-formulario-partido></app-formulario-partido>
      </aside>
    </div>
  `,
  styles: [`
    .dashboard-layout {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 30px;
      padding: 30px;
      max-width: 1400px;
      margin: 0 auto;
    }
    @media (max-width: 1000px) {
      .dashboard-layout {
        grid-template-columns: 1fr;
      }
      .sidebar {
        order: -1;
      }
    }
  `]
})
export class InicioComponente {}
