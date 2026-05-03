import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LigaServicio } from '../../services/liga.servicio';

// simulador
@Component({
  selector: 'app-formulario-partido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="retro-form">
      <h3 class="retro-header">REGISTRAR ENCUENTRO</h3>
      
      <div class="retro-grid">
        <div class="team-select">
          <label>EQUIPO LOCAL</label>
          <select [(ngModel)]="idLocal" class="pixel-select">
            <option value="" disabled selected>SELECCIONAR...</option>
            <option *ngFor="let equipo of ligaServicio.equipos()" [value]="equipo.id">
              {{ equipo.nombre }}
            </option>
          </select>
          <div class="score-container">
             <input type="number" [(ngModel)]="golesLocal" min="0" class="pixel-input">
          </div>
        </div>

        <div class="vs-container">VS</div>

        <div class="team-select">
          <label>EQUIPO VISITANTE</label>
          <select [(ngModel)]="idVisitante" class="pixel-select">
            <option value="" disabled selected>SELECCIONAR...</option>
            <option *ngFor="let equipo of ligaServicio.equipos()" [value]="equipo.id">
              {{ equipo.nombre }}
            </option>
          </select>
          <div class="score-container">
             <input type="number" [(ngModel)]="golesVisitante" min="0" class="pixel-input">
          </div>
        </div>
      </div>

      <p *ngIf="error()" class="error-msg">!! {{ error() }} !!</p>
      
      <div class="actions">
        <button (click)="alEnviar()" class="btn-retro-big">
          SIMULAR PARTIDO
        </button>
        
        <button (click)="jugarJornadaCompleta()" class="btn-retro-big neon">
          JORNADA COMPLETA
        </button>
      </div>
    </div>
  `,
  styles: [`
    .retro-form {
      background: #000;
      border: 4px solid #333;
      padding: 25px;
      box-shadow: 8px 8px 0px #1a1a2e;
      font-family: 'Press Start 2P', cursive;
    }
    
    .retro-header {
      color: #ff00ff;
      font-size: 0.9rem;
      text-align: center;
      margin-bottom: 25px;
      text-shadow: 2px 2px #000;
    }

    .retro-grid {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
    }

    .team-select {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    label {
      font-size: 0.6rem;
      color: #00ff41;
    }

    .pixel-select {
      width: 100%;
      background: #111;
      border: 3px solid #444;
      color: #fff;
      padding: 10px;
      font-family: 'VT323', monospace;
      font-size: 1.1rem;
      outline: none;
    }

    .score-container {
      display: flex;
      justify-content: center;
    }

    .pixel-input {
      width: 60px;
      height: 60px;
      background: #000;
      border: 3px solid #ff3939;
      color: #ffff00;
      font-family: 'Press Start 2P', cursive;
      font-size: 1.5rem;
      text-align: center;
      outline: none;
    }

    .vs-container {
      font-size: 1.5rem;
      color: #444;
    }

    .actions {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .btn-retro-big {
      width: 100%;
      background: #ff3939;
      border: 4px solid #921212;
      color: #fff;
      padding: 15px;
      font-size: 0.8rem;
    }

    .btn-retro-big:hover {
      background: #ff5c5c;
    }

    .btn-retro-big.neon {
      background: #000;
      border-color: #00d4ff;
      color: #00d4ff;
    }

    .btn-retro-big.neon:hover {
      background: #003040;
      color: #fff;
    }

    .error-msg {
      color: #ff3939;
      font-size: 0.6rem;
      text-align: center;
      margin-top: 15px;
    }
  `]
})
export class FormularioPartidoComponente {
  /** Inyección del servicio de liga para realizar las operaciones de registro */
  ligaServicio = inject(LigaServicio);

  /** ID del equipo local seleccionado */
  idLocal = '';
  /** ID del equipo visitante seleccionado */
  idVisitante = '';
  /** Goles introducidos para el equipo local */
  golesLocal = 0;
  /** Goles introducidos para el equipo visitante */
  golesVisitante = 0;
  /** Señal para gestionar mensajes de error en la validación */
  error = signal('');

  /**
   * Procesa el envío del formulario manual.
   * Valida que se hayan seleccionado equipos distintos antes de registrar.
   */
  alEnviar() {
    if (!this.idLocal || !this.idVisitante) {
      this.error.set('FALTAN EQUIPOS');
      return;
    }
    if (this.idLocal === this.idVisitante) {
      this.error.set('ERROR: MISMO EQUIPO');
      return;
    }

    this.ligaServicio.añadirPartido(this.idLocal, this.idVisitante, this.golesLocal, this.golesVisitante);
    this.resetearFormulario();
  }

  /**
   * Simula una jornada completa enfrentando a todos los equipos de forma aleatoria.
   */
  jugarJornadaCompleta() {
    const equipos = [...this.ligaServicio.equipos()];
    // Algoritmo de barajado Fisher-Yates
    for (let i = equipos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [equipos[i], equipos[j]] = [equipos[j], equipos[i]];
    }
    // Emparejamiento por parejas
    for (let i = 0; i < equipos.length; i += 2) {
      if (equipos[i] && equipos[i + 1]) {
        const gL = Math.floor(Math.random() * 5);
        const gV = Math.floor(Math.random() * 5);
        this.ligaServicio.añadirPartido(equipos[i].id, equipos[i + 1].id, gL, gV);
      }
    }
    this.error.set('');
  }

  /**
   * Limpia los campos del formulario después de una operación exitosa.
   */
  private resetearFormulario() {
    this.error.set('');
    this.golesLocal = 0;
    this.golesVisitante = 0;
    this.idLocal = '';
    this.idVisitante = '';
  }
}
