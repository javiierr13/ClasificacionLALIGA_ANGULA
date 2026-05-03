import { Injectable, signal } from '@angular/core';
import { Equipo } from '../models/equipo.modelo';
import { Jugador } from '../models/jugador.modelo';

// Servicio encargado de gestionar la lógica de la liga de fútbol.
@Injectable({
  providedIn: 'root'
})
export class LigaServicio {
  private senalEquipos = signal<Equipo[]>(this.datosIniciales());

  // Expone la señal de equipos como solo lectura para los componentes
  get equipos() {
    return this.senalEquipos;
  }

  // Busca un equipo específico por su identificador único.
  obtenerEquipoPorId(id: string): Equipo | undefined {
    return this.senalEquipos().find(t => t.id === id);
  }

  // Registra el resultado de un enfrentamiento entre dos equipos.
  añadirPartido(idLocal: string, idVisitante: string, golesLocal: number, golesVisitante: number): void {
    const equiposActuales = [...this.senalEquipos()];
    const local = equiposActuales.find(t => t.id === idLocal);
    const visitante = equiposActuales.find(t => t.id === idVisitante);

    if (local && visitante && idLocal !== idVisitante) {
      local.registrarPartido(golesLocal, golesVisitante);
      visitante.registrarPartido(golesVisitante, golesLocal);

      this.senalEquipos.set(this.ordenarEquipos(equiposActuales));
    }
  }

  // Ordena la lista de equipos basándose en puntos, diferencia de goles y goles a favor.
  private ordenarEquipos(equipos: Equipo[]): Equipo[] {
    return equipos.sort((a, b) => {
      if (b.puntos !== a.puntos) return b.puntos - a.puntos;
      if (b.diferenciaGoles !== a.diferenciaGoles) return b.diferenciaGoles - a.diferenciaGoles;
      return b.golesFavor - a.golesFavor;
    });
  }

  // Inicializa los datos de la liga con equipos predefinidos y sus jugadores.
  private datosIniciales(): Equipo[] {
    const datosEquipos = [
      { nombre: "FC Barcelona", escudo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
      { nombre: "Real Madrid", escudo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
      { nombre: "Villarreal CF", escudo: "https://icon.horse/icon/villarrealcf.es" },
      { nombre: "Atlético de Madrid", escudo: "https://www.atleticodemadrid.com/images/EscudoATM.svg" },
      { nombre: "Real Betis", escudo: "https://upload.wikimedia.org/wikipedia/en/1/13/Real_betis_logo.svg" },
      { nombre: "Getafe CF", escudo: "https://upload.wikimedia.org/wikipedia/en/4/46/Getafe_logo.svg" },
      { nombre: "Celta de Vigo", escudo: "https://rccelta.es/app/themes/rccelta/dist/images/celta-logo-negative.svg" },
      { nombre: "Real Sociedad", escudo: "https://cdn.realsociedad.eus///Uploads/equipos//_0_ecudo-color.png" },
      { nombre: "Osasuna", escudo: "https://icon.horse/icon/osasuna.es" },
      { nombre: "Athletic Club", escudo: "https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg" },
      { nombre: "Rayo Vallecano", escudo: "https://icon.horse/icon/rayovallecano.es" },
      { nombre: "Valencia C. F.", escudo: "https://www.valenciacf.com/svg/escudo.svg" },
      { nombre: "RCD Espanyol", escudo: "https://upload.wikimedia.org/wikipedia/en/d/d6/Rcd_espanyol_logo.svg" },
      { nombre: "Elche C. F.", escudo: "https://statics-maker.llt-services.com/elc/images/2022/11/14/xlarge/bcf670fa73b008488a406954731afe81.png" },
      { nombre: "Girona", escudo: "https://icon.horse/icon/gironafc.cat" },
      { nombre: "Deportivo Alavés", escudo: "https://icon.horse/icon/deportivoalaves.com" },
      { nombre: "R.C.D. Mallorca", escudo: "https://icon.horse/icon/rcdmallorca.es" },
      { nombre: "Sevilla FC", escudo: "https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg" },
      { nombre: "Levante UD", escudo: "https://icon.horse/icon/levanteud.com" },
      { nombre: "Real Oviedo", escudo: "https://icon.horse/icon/realoviedo.es" }
    ];

    return datosEquipos.map((datos) => {
      const id = datos.nombre.toLowerCase().replace(/\s+/g, '-');
      const equipo = new Equipo(id, datos.nombre, datos.escudo);

      equipo.jugadores = [
        new Jugador(`${id}-p1`, `Capitán ${datos.nombre}`, 6, 'Centrocampista'),
        new Jugador(`${id}-p2`, `Goleador ${datos.nombre}`, 10, 'Delantero'),
        new Jugador(`${id}-p3`, `Muro ${datos.nombre}`, 1, 'Portero'),
      ];

      return equipo;
    });
  }
}
