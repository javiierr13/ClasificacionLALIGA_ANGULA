# Descripción del Proyecto para Diagrama UML - Liga Retro Arcade

Este documento detalla la estructura de clases y servicios de la aplicación Angular "Liga Retro Arcade" para la generación de un diagrama de clases UML fiel a la implementación.

## Modelos de Datos (POO)

### 1. Clase `Equipo`
Representa a un equipo de la liga y encapsula su lógica de estadísticas.
- **Atributos (Privados):**
  - `_id: string`: Identificador único basado en el nombre.
  - `_nombre: string`: Nombre oficial del equipo.
  - `_escudo: string`: URL del logo/escudo.
  - `_jugadores: Jugador[]`: Lista de jugadores (Plantilla).
  - `_partidosJugados: number`: Contador de encuentros disputados.
  - `_victorias: number`: Partidos ganados.
  - `_empates: number`: Partidos empatados.
  - `_derrotas: number`: Partidos perdidos.
  - `_golesFavor: number`: Goles marcados.
  - `_golesContra: number`: Goles recibidos.
  - `_puntos: number`: Puntos totales acumulados.
  - `_historialResultados: ResultadoPartido[]`: Registro histórico ('V', 'E', 'D').
- **Métodos:**
  - `registrarPartido(misGoles, golesRival): void`: Actualiza estadísticas y racha.
  - `diferenciaGoles (getter): number`: Cálculo dinámico de la diferencia de goles.
  - `racha (getter): ResultadoPartido[]`: Obtiene los últimos 5 resultados.
  - `getters/setters`: Acceso controlado a las propiedades privadas.

### 2. Clase `Jugador`
Representa a un futbolista individual.
- **Atributos (Privados):**
  - `_id: string`: ID único.
  - `_nombre: string`: Nombre completo.
  - `_dorsal: number`: Número de camiseta.
  - `_posicion: string`: Posición (Portero, Delantero, etc.).
- **Métodos:**
  - `getters/setters`: Para todas las propiedades.

## Servicios de Lógica de Negocio

### 3. Clase `LigaServicio`
Gestiona el estado global de la liga y la persistencia en memoria.
- **Atributos:**
  - `senalEquipos: Signal<Equipo[]>`: Estado reactivo de Angular con la lista de equipos.
- **Métodos:**
  - `datosIniciales(): Equipo[]`: Crea los 20 equipos iniciales con sus jugadores.
  - `añadirPartido(idLocal, idVisitante, golesLocal, golesVisitante): void`: Registra un encuentro.
  - `ordenarEquipos(equipos): Equipo[]`: Ordenación por Puntos > DG > Goles Favor.
  - `obtenerEquipoPorId(id): Equipo | undefined`: Búsqueda de equipos.

## Componentes y Navegación

### 4. Estructura de Componentes
- `InicioComponente`: Vista principal (Dashboard) que integra la clasificación y el formulario.
- `ClasificacionComponente`: Tabla dinámica que consume datos del servicio.
- `FormularioPartidoComponente`: Registro manual y simulación de "Jornada Completa".
- `DetalleEquipoComponente`: Ficha técnica con estadísticas completas y plantilla.
- `CabeceraComponente` / `PieComponente`: Elementos de interfaz fija.

## Relaciones UML
1. **Composición (1:*):** Un `Equipo` contiene múltiples objetos `Jugador`.
2. **Dependencia:** El `LigaServicio` gestiona y ordena instancias de `Equipo`.
3. **Inyección de Dependencias:** Los componentes consumen `LigaServicio` para interactuar con el modelo.
