import { Component } from '@angular/core';

//pie fijo
@Component({
  selector: 'app-pie',
  standalone: true,
  template: `
    <footer class="retro-footer">
      <div class="container">
        <p>&copy; 2026 Fco Javier Ruiz - UD03 Desarrollo Web Entorno Cliente</p>
        <div class="status-bar">
          <span class="status-item">SYSTEM READY</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .retro-footer {
      background: #000;
      border-top: 4px solid #333;
      padding: 30px 0;
      margin-top: 50px;
      color: #666;
      font-family: 'Press Start 2P', cursive;
      font-size: 0.6rem;
      text-align: center;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .status-bar {
      margin-top: 15px;
      display: flex;
      justify-content: center;
      gap: 30px;
      color: #00ff41;
    }
    .status-item {
      text-shadow: 0 0 5px #00ff41;
    }
  `]
})
export class PieComponente { }
