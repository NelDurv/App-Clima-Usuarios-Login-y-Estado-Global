 Vue Clima Chile - App de Clima con Autenticación
Aplicación web de clima desarrollada con Vue 3 que permite consultar el pronóstico de ciudades chilenas, con sistema de autenticación de usuarios y personalización de preferencias.

 Tabla de Contenidos
Tecnologías

Estructura del Proyecto

Funcionalidades

Requisitos Previos

Instalación y Configuración

Scripts Disponibles

Credenciales de Demo

Capturas de Pantalla

Contacto

 Tecnologías
Tecnología	Versión	Descripción
Vue.js	3.4.0	Framework progresivo para interfaces de usuario
Vue Router	4.2.5	Enrutador oficial para Vue.js
Vuex	4.1.0	Gestión de estado centralizada
Vite	6.4.3	Bundler ultrarrápido para desarrollo
Axios	1.6.0	Cliente HTTP para peticiones API
Bootstrap	5.3.8	Framework CSS para diseño responsive
Font Awesome	6.0.0	Biblioteca de iconos vectoriales
 Estructura del Proyecto
text
modulo7 App/
├── src/
│   ├── assets/
│   │   ├── css/               # Estilos globales
│   │   └── img/               # Imágenes de fondo de ciudades
│   ├── components/
│   │   ├── auth/              # Componentes de autenticación
│   │   ├── common/            # Componentes compartidos
│   │   └── weather/           # Componentes del clima
│   ├── composables/           # Funciones reutilizables
│   ├── router/                # Configuración de rutas
│   ├── services/              # Servicios (API mock)
│   ├── store/                 # Vuex - Estado global
│   │   └── modules/           # Módulos de Vuex
│   └── views/                 # Vistas de la aplicación
│       ├── auth/              # Login y Registro
│       └── protected/         # Rutas protegidas
├── index.html
├── package.json
├── vite.config.js
└── README.md
 Funcionalidades
 Autenticación
Registro de nuevos usuarios

Inicio de sesión con credenciales

Cierre de sesión

Persistencia de sesión con localStorage

Protección de rutas con Navigation Guards

 Clima
Consulta de clima actual por ciudad

Pronóstico extendido a 6 días

Estadísticas semanales (temperaturas, días soleados/lluviosos)

Alertas climáticas personalizadas

 Personalización
Gestión de ciudades favoritas por usuario

Cambio entre °C y °F

Tema claro/oscuro

Información de perfil de usuario

 Requisitos Previos
Node.js v16 o superior

npm v8 o superior

Git para clonar el repositorio

 Instalación y Configuración
1. Clonar el Repositorio
bash
git clone https://github.com/tu-usuario/vue-clima-chile.git
cd modulo7\ App
2. Instalar Dependencias
bash
npm install --legacy-peer-deps
3. Ejecutar en Desarrollo
bash
npm run dev
La aplicación estará disponible en: http://localhost:5173

4. Construir para Producción
bash
npm run build
5. Vista Previa de Producción
bash
npm run preview
 Scripts Disponibles
Comando	Descripción
npm run dev	Inicia servidor de desarrollo
npm run build	Construye para producción
npm run preview	Vista previa de producción
npm run test:unit	Ejecuta pruebas unitarias
npm run test:unit:watch	Pruebas en modo watch
npm run test:unit:coverage	Pruebas con cobertura
 Credenciales de Demo
Email	Contraseña	Nombre
juan@email.com	123456	Juan Pérez
maria@email.com	123456	María González
carlos@email.com	123456	Carlos Rojas
 Capturas de Pantalla
 Página Principal
text
[Espacio para captura de pantalla - HomeView]
 Inicio de Sesión
text
[Espacio para captura de pantalla - LoginView]
 Detalle del Clima
text
[Espacio para captura de pantalla - DetailView]
 Favoritos
text
[Espacio para captura de pantalla - FavoritesView]
 Preferencias
text
[Espacio para captura de pantalla - PreferencesView]
 API Utilizada
La aplicación consume datos de Open-Meteo API:

Clima actual: https://api.open-meteo.com/v1/forecast

Pronóstico diario: Parámetros daily para 7 días

Datos de fallback: En caso de error en la API, se utilizan datos locales simulados.

 Contribución
Fork el repositorio

Crea una rama: git checkout -b feature/nueva-funcionalidad

Realiza tus cambios y commit: git commit -m 'feat: descripción'

Push a la rama: git push origin feature/nueva-funcionalidad

Abre un Pull Request

 Licencia
Este proyecto está bajo la licencia MIT.

 Contacto
Desarrollador: NelDur
Email: [tu-email@ejemplo.com]
GitHub: https://github.com/tu-usuario

 Agradecimientos
Open-Meteo por su excelente API de clima gratuita

Bootstrap por su framework CSS

Font Awesome por sus iconos

¡Gracias por visitar el proyecto! 

