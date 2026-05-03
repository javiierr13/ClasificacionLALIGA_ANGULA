import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponente } from './components/cabecera/cabecera.componente';
import { PieComponente } from './components/pie/pie.componente';

/**
 * Componente principal de la aplicación que gestiona la estructura base (Layout).
 * Incluye la cabecera, el área de contenido dinámico y el pie de página.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceraComponente, PieComponente],
  templateUrl: './app.html',
  styles: [`
    .container {
      max-width: 1400px;
      margin: 0 auto;
      min-height: 70vh;
    }
  `]
})
export class AppComponent {
  /** Título de la aplicación para metadatos internos */
  title = 'Liga Retro Arcade';
}
