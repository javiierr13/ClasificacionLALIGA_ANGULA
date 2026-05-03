import { Component } from '@angular/core';

// cabecera fija


@Component({
  selector: 'app-cabecera',
  standalone: true,
  template: `
    <header class="retro-header">
      <div class="container">
        <h1 class="retro-logo">
          <span class="icon">⚽</span> 
          LALIGA <span class="year">2025/26</span>
        </h1>
      </div>
    </header>
  `,
  styles: [`
    .retro-header {
      background: #000;
      border-bottom: 4px solid #333;
      padding: 20px 0;
      margin-bottom: 40px;
      box-shadow: 0 4px 0 #1a1a2e;
    }
    .retro-logo {
      font-family: 'Press Start 2P', cursive;
      font-size: 1.5rem;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 15px;
      margin: 0;
      text-shadow: 3px 3px #ff00ff;
    }
    .retro-logo .icon {
      font-size: 2rem;
      filter: drop-shadow(2px 2px #00ff41);
    }
    .retro-logo .year {
      color: #00ff41;
      font-size: 1rem;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
    }
    @media (max-width: 600px) {
      .retro-logo {
        font-size: 1rem;
      }
      .retro-logo .icon {
        font-size: 1.5rem;
      }
    }
  `]
})
export class CabeceraComponente { }
