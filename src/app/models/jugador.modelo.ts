// Clase que representa a un jugador
export class Jugador {

  constructor(
    private _id: string,
    private _nombre: string,
    private _dorsal: number,
    private _posicion: string
  ) { }

  // GETTERS

  // Obtiene el ID del jugador
  get id(): string { return this._id; }

  // Obtiene el nombre del jugador
  get nombre(): string { return this._nombre; }

  // Obtiene el dorsal del jugador
  get dorsal(): number { return this._dorsal; }

  // Obtiene la posición del jugador
  get posicion(): string { return this._posicion; }

  // SETTERS

  // Actualiza el nombre del jugador
  set nombre(nuevoNombre: string) { this._nombre = nuevoNombre; }

  // Actualiza el dorsal del jugador
  set dorsal(nuevoDorsal: number) { this._dorsal = nuevoDorsal; }

  /** Actualiza la posición del jugador */
  set posicion(nuevaPosicion: string) { this._posicion = nuevaPosicion; }
}
