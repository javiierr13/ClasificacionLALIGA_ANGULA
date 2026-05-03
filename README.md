# Liga Retro Arcade - Clasificación Angular

Aplicación web desarrollada con **Angular 19**, **TypeScript** y una estética **Retro Arcade** que permite gestionar y visualizar la tabla de clasificación de una liga de fútbol. El proyecto implementa principios avanzados de **Programación Orientada a Objetos (OOP)** para el manejo de la lógica de negocio y el estado de la aplicación mediante **Angular Signals**.

🚀 Características Principales
- **Tabla de Clasificación Retro**: Visualización dinámica de posición, puntos, partidos jugados, victorias, empates, derrotas y una racha de los últimos 5 partidos representada con píxeles de colores.
- **Gestión de Partidos**: Formulario para registrar nuevos resultados entre equipos, actualizando automáticamente todas las estadísticas y la ordenación de la tabla.
- **Simulación de Jornada Completa**: Funcionalidad extra original que permite simular una jornada entera de forma aleatoria, barajando los equipos y procesando múltiples partidos al instante.
- **Ficha Técnica de Equipos**: Vista detallada para cada equipo que muestra estadísticas completas y la plantilla de jugadores, obtenida directamente del modelo de datos.
- **Diseño Temático**: Estética pixel-art cuidada con fuentes clásicas (`Press Start 2P`, `VT323`), animaciones de neón y efectos visuales de arcade.

🛠️ Tecnologías Utilizadas
- **Frontend**: Angular 19, TypeScript
- **Gestión de Estado**: Angular Signals (Señales reactivas para una actualización eficiente)
- **Estilos**: Vanilla CSS (CSS moderno con variables y grid/flexbox temático)
- **Patrones de Diseño**: Programación Orientada a Objetos (Encapsulación, Clases, Param Properties, Inyección de Dependencias).

🏗️ Arquitectura y Modelo de Datos
La aplicación sigue una arquitectura basada en clases para encapsular la lógica del dominio, separándola de la capa de presentación. Puedes encontrar el detalle técnico completo en el archivo `uml_description.md`.

### Entidad Equipo
Representa a cada equipo en la liga y gestiona sus propias estadísticas.
- **Encapsulación**: Atributos privados protegidos del acceso externo.
- **Cálculo Dinámico**: Propiedades como la diferencia de goles y la racha se calculan mediante Getters, garantizando la integridad de los datos.
- **Métodos de Negocio**: `registrarPartido()` altera el estado interno aplicando las reglas de puntuación (V:3, E:1, D:0).

### Entidad Jugador
Representa a un futbolista individual con atributos como dorsal y posición, encapsulados mediante propiedades privadas y métodos de acceso.

💻 Instalación y Ejecución Local
Sigue estos pasos para levantar el proyecto en tu máquina:

1. Asegúrate de tener **Node.js** instalado.
2. Navega al directorio del proyecto e instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el servidor de desarrollo local:
   ```bash
   npm start
   ```
4. Abrir en el navegador: La aplicación estará disponible por defecto en `http://localhost:4200/`.

📂 Estructura del Proyecto
- `src/app/components/` - Componentes de la interfaz (Inicio, Clasificación, Detalle, etc.).
- `src/app/models/` - Clases del dominio (Equipo, Jugador).
- `src/app/services/` - Servicios de lógica de negocio (LigaServicio).
- `src/app/app.routes.ts` - Configuración de la navegación dinámica.
- `uml_description.md` - Documentación del Diagrama UML y arquitectura POO.
- `README.md` - Información general del proyecto.
