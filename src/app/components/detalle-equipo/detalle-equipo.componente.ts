import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LigaServicio } from '../../services/liga.servicio';
import { Equipo } from '../../models/equipo.modelo';

// detalles del equipo
@Component({
  selector: 'app-detalle-equipo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="equipo" class="detail-container">
      <header class="detail-header">
        <button routerLink="/" class="btn-back">← Volver</button>
        <h1>{{ equipo.nombre }}</h1>
      </header>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-val">{{ equipo.puntos }}</span>
          <span class="stat-label">Puntos</span>
        </div>
        <div class="stat-card">
          <span class="stat-val">{{ equipo.partidosJugados }}</span>
          <span class="stat-label">Partidos</span>
        </div>
        <div class="stat-card win">
          <span class="stat-val">{{ equipo.victorias }}</span>
          <span class="stat-label">G</span>
        </div>
        <div class="stat-card draw">
          <span class="stat-val">{{ equipo.empates }}</span>
          <span class="stat-label">E</span>
        </div>
        <div class="stat-card loss">
          <span class="stat-val">{{ equipo.derrotas }}</span>
          <span class="stat-label">P</span>
        </div>
        <div class="stat-card">
          <span class="stat-val">{{ equipo.golesFavor }}</span>
          <span class="stat-label">GF</span>
        </div>
        <div class="stat-card">
          <span class="stat-val">{{ equipo.golesContra }}</span>
          <span class="stat-label">GC</span>
        </div>
        <div class="stat-card highlight">
          <span class="stat-val">{{ equipo.diferenciaGoles }}</span>
          <span class="stat-label">DG</span>
        </div>
      </div>

      <section class="roster-section">
        <h2>Plantilla</h2>
        <div class="player-list">
          <div *ngFor="let jugador of equipo.jugadores" class="player-card">
            <span class="player-num">{{ jugador.dorsal }}</span>
            <div class="player-info">
              <span class="player-name">{{ jugador.nombre }}</span>
              <span class="player-pos">{{ jugador.posicion }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div *ngIf="!equipo" class="not-found">
      <p>Equipo no encontrado.</p>
      <button routerLink="/" class="btn-retro">Volver al Inicio</button>
    </div>
  `,
  styles: [`
    .detail-container { padding: 30px; max-width: 900px; margin: 0 auto; font-family: 'Press Start 2P', cursive; }
    .detail-header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
    .btn-back {
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid #333;
      color: white;
      padding: 10px 15px;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.7rem;
    }
    .btn-back:hover { background: #333; }
    h1 { margin: 0; color: #ffff00; font-size: 1.5rem; text-shadow: 2px 2px #ff00ff; }
    h2 { color: #00ff41; font-size: 1rem; margin-bottom: 20px; }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .stat-card {
      background: #000;
      padding: 20px;
      border: 3px solid #333;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 5px 5px 0 #1a1a2e;
    }
    .stat-val { font-size: 1.5rem; font-weight: bold; color: #fff; margin-bottom: 10px; }
    .stat-label { color: #aaa; text-transform: uppercase; font-size: 0.5rem; }
    
    .win .stat-val { color: #00ff41; }
    .draw .stat-val { color: #ffff00; }
    .loss .stat-val { color: #ff3939; }
    .highlight .stat-val { color: #00d4ff; }

    .roster-section { margin-top: 50px; }
    .player-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }
    .player-card {
      background: #050505;
      padding: 15px;
      border: 2px solid #222;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .player-num {
      background: #00ff41;
      color: #000;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 0.9rem;
    }
    .player-info { display: flex; flex-direction: column; gap: 5px; }
    .player-name { font-weight: bold; color: #fff; font-size: 0.7rem; }
    .player-pos { font-size: 0.5rem; color: #888; }
    
    .not-found { text-align: center; padding: 100px; font-family: inherit; }
    .btn-retro { background: #ff3939; color: white; border: 4px solid #921212; padding: 15px; cursor: pointer; }
  `]
})
export class DetalleEquipoComponente {
  /** Acceso a los parámetros de la URL activa */
  private route = inject(ActivatedRoute);
  /** Servicio para obtener los datos del equipo */
  private ligaServicio = inject(LigaServicio);

  /** Equipo actual que se está visualizando */
  equipo?: Equipo;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.equipo = this.ligaServicio.obtenerEquipoPorId(id);
    }
  }
}
