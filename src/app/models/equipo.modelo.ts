import { Jugador } from './jugador.modelo';

// Tipo para los resultados de los partidos
export type ResultadoPartido = 'V' | 'E' | 'D';

// Clase que representa un equipo de fútbol y gestiona sus estadísticas.
export class Equipo {
  private _partidosJugados: number = 0;
  private _victorias: number = 0;
  private _empates: number = 0;
  private _derrotas: number = 0;
  private _golesFavor: number = 0;
  private _golesContra: number = 0;
  private _puntos: number = 0;
  private _historialResultados: ResultadoPartido[] = [];
  private _jugadores: Jugador[] = [];

  // Constructor
  constructor(
    private _id: string,
    private _nombre: string,
    private _escudo: string
  ) { }

  // GETTERS

  get id(): string { return this._id; }
  get nombre(): string { return this._nombre; }
  get escudo(): string { return this._escudo; }
  get partidosJugados(): number { return this._partidosJugados; }
  get victorias(): number { return this._victorias; }
  get empates(): number { return this._empates; }
  get derrotas(): number { return this._derrotas; }
  get golesFavor(): number { return this._golesFavor; }
  get golesContra(): number { return this._golesContra; }
  get puntos(): number { return this._puntos; }
  get jugadores(): Jugador[] { return this._jugadores; }

  // Calcula la diferencia de goles (G. Favor - G. Contra)
  get diferenciaGoles(): number {
    return this._golesFavor - this._golesContra;
  }

  // Obtiene la racha de los últimos 5 partidos
  get racha(): ResultadoPartido[] {
    return this._historialResultados.slice(-5);
  }

  // SETTERS

  set jugadores(nuevosJugadores: Jugador[]) {
    this._jugadores = nuevosJugadores;
  }

  // MÉTODOS

  // Registra el resultado de un partido y actualiza las estadísticas.
  registrarPartido(misGoles: number, golesRival: number): void {
    this._partidosJugados++;
    this._golesFavor += misGoles;
    this._golesContra += golesRival;

    let resultado: ResultadoPartido;

    if (misGoles > golesRival) {
      this._victorias++;
      this._puntos += 3;
      resultado = 'V';
    } else if (misGoles === golesRival) {
      this._empates++;
      this._puntos += 1;
      resultado = 'E';
    } else {
      this._derrotas++;
      resultado = 'D';
    }

    this._historialResultados.push(resultado);
  }
}
