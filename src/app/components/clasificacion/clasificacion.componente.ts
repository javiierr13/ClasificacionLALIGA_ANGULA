import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LigaServicio } from '../../services/liga.servicio';

// tabla de la clasificacion


@Component({
  selector: 'app-clasificacion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="retro-container">
      <h2 class="retro-title">CLASIFICACIÓN</h2>
      <table class="retro-table">
        <thead>
          <tr>
            <th>POS</th>
            <th class="text-left">EQUIPO</th>
            <th>PTS</th>
            <th>PJ</th>
            <th>G</th>
            <th>E</th>
            <th>P</th>
            <th>U5J</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let equipo of ligaServicio.equipos(); let i = index" class="team-row">
            <td>{{ (i + 1).toString().padStart(2, '0') }}</td>
            <td class="text-left">
              <a [routerLink]="['/equipo', equipo.id]" class="team-link">
                <div class="team-info">
                  <span class="team-name">{{ equipo.nombre }}</span>
                  <img [src]="equipo.escudo" [alt]="equipo.nombre" class="team-logo">
                </div>
              </a>
            </td>
            <td class="font-bold highlight">{{ equipo.puntos }}</td>
            <td>{{ equipo.partidosJugados }}</td>
            <td>{{ equipo.victorias }}</td>
            <td>{{ equipo.empates }}</td>
            <td>{{ equipo.derrotas }}</td>
            <td>
              <div class="form-pixels">
                <div *ngFor="let res of equipo.racha" 
                     class="pixel-box" 
                     [ngClass]="{
                       'win': res === 'V',
                       'draw': res === 'E',
                       'loss': res === 'D'
                     }">
                </div>
                <div *ngFor="let empty of [].constructor(5 - equipo.racha.length)" class="pixel-box empty"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <details class="retro-legend">
        <summary>MOSTRAR INFO SISTEMA (LEYENDA)</summary>
        <div class="legend-content">
          <div class="legend-grid">
            <div>PTS: PUNTOS</div>
            <div>PJ: JUGADOS</div>
            <div>G: GANADOS</div>
            <div>E: EMPATADOS</div>
            <div>P: PERDIDOS</div>
            <div>U5J: ÚLTIMAS 5 JORNADAS</div>
          </div>
          <div class="legend-results">
            <span class="win">■ VICTORIA</span>
            <span class="draw">■ EMPATE</span>
            <span class="loss">■ DERROTA</span>
          </div>
        </div>
      </details>
    </div>
  `,
  styles: [`
    .retro-container {
      background: #000;
      border: 4px solid #333;
      padding: 20px;
      box-shadow: 8px 8px 0px #1a1a2e;
    }
    
    .retro-title {
      font-family: 'Press Start 2P', cursive;
      color: #ffff00;
      font-size: 1rem;
      text-align: center;
      margin-bottom: 30px;
      text-shadow: 2px 2px #ff00ff;
    }

    .retro-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 5px;
      font-family: 'VT323', monospace;
      font-size: 1.2rem;
    }

    th {
      font-family: 'Press Start 2P', cursive;
      font-size: 0.6rem;
      color: #00d4ff;
      padding: 10px;
      border-bottom: 2px solid #333;
    }

    td {
      padding: 10px;
      text-align: center;
      background: #0a0a0a;
      border-top: 1px solid #222;
      border-bottom: 1px solid #222;
    }

    .team-row:hover td {
      background: #111;
      color: #00ff41;
    }

    .text-left { text-align: left; }
    .highlight { color: #ffff00; }

    .team-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .team-logo {
      height: 20px;
      image-rendering: pixelated;
    }

    .team-link {
      color: inherit;
      text-decoration: none;
      transition: all 0.2s;
    }

    .form-pixels {
      display: flex;
      gap: 4px;
      justify-content: center;
    }

    .pixel-box {
      width: 14px;
      height: 14px;
      border: 1px solid #000;
    }

    .pixel-box.win { background: #00ff41; box-shadow: 0 0 5px #00ff41; }
    .pixel-box.draw { background: #ffff00; box-shadow: 0 0 5px #ffff00; }
    .pixel-box.loss { background: #ff0000; box-shadow: 0 0 5px #ff0000; }
    .pixel-box.empty { background: #333; }

    .retro-legend {
      margin-top: 20px;
      font-family: 'Press Start 2P', cursive;
      font-size: 0.6rem;
    }

    summary {
      cursor: pointer;
      color: #555;
      padding: 10px;
    }

    summary:hover { color: #00ff41; }

    .legend-content {
      padding: 15px;
      background: #050505;
      border: 2px solid #222;
      color: #00ff41;
    }

    .legend-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 10px;
      margin-bottom: 15px;
    }

    .legend-results {
      display: flex;
      gap: 20px;
    }

    .win { color: #00ff41; }
    .draw { color: #ffff00; }
    .loss { color: #ff0000; }
  `]
})
export class ClasificacionComponente {
  /** Inyección del servicio de liga para acceder a los datos de los equipos */
  ligaServicio = inject(LigaServicio);
}
