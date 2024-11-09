# Formulario IPLAN - Cuestionario Interactivo

_Este proyecto es una aplicación de formulario interactivo para ayudar a las empresas a evaluar su preparación en productividad, colaboración y seguridad. Al responder las preguntas, los usuarios reciben recomendaciones personalizadas sobre cómo optimizar su entorno de trabajo con Google Workspace._

## Funcionalidades

- Preguntas Interactivas: El formulario incluye varios tipos de preguntas: botones de opción, casillas de verificación y preguntas de ordenamiento.
- Evaluación Personalizada: Al finalizar, la aplicación genera una evaluación personalizada en base a las respuestas del usuario.
- Guardar Datos: Los datos se almacenan en Firebase Realtime Database.
- Descarga de PDF: Los usuarios pueden descargar un PDF con sus respuestas y recomendaciones.
- Opciones de Contacto: Los usuarios pueden solicitar contacto para recibir más información.

## Tecnologías Utilizadas

- Frontend: HTML5, CSS3, JavaScript (jQuery), Bootstrap 4
- Framework: Vite para el desarrollo y construcción del proyecto
- Firebase: Firebase Realtime Database para almacenar respuestas de los usuarios
- Generación de PDF: Integración de jspdf y html2canvas para generar un PDF descargable con las respuestas
- Interactividad: Utiliza jQuery para el manejo de eventos y transiciones, así como sortablejs para el ordenamiento de elementos en preguntas de tipo drag-and-drop

## Requisitos Previos

- Node.js y npm instalados en el sistema.
- Firebase CLI configurado si deseas desplegar la aplicación en Firebase Hosting.

## Instalación

- Clonar el repositorio (si es necesario):

```bash
git clone https://github.com/VarelaCristianFacundo/formulario-iplan.git
cd formulario-iplan
```

- Instalar las dependencias:

```bash
npm install
```

- Configurar Firebase: Actualiza el archivo firebase.js con tus propias credenciales de Firebase si usas una instancia diferente.

# Scripts Disponibles

- npm run dev: Inicia el servidor de desarrollo con Vite.
- npm run build: Compila la aplicación para producción.
- npm run preview: Previsualiza el build de producción.
- npm run deploy: Compila y despliega la aplicación en Firebase Hosting.

## Estructura de Archivos

```
└── 📁formulario-iplan    
    └── 📁css
        └── estilos.css
    └── 📁js
        └── bootstrap-multi-step-form.js
        └── firebase.js
        └── helpers.js
        └── main.js
    └── 📁multimedia
        └── 📁background
            └── background-desktop.jpg
            └── background-mobile.jpg
        └── 📁imagenescard
            └── imagen1.png
            └── imagen1.svg
            └── imagen10.svg
            └── imagen11.svg
            └── imagen12.svg
            └── imagen13.svg
            └── imagen2.svg
            └── imagen3.png
            └── imagen4.svg
            └── imagen5.svg
            └── imagen6.svg
            └── imagen7.svg
            └── imagen8.svg
            └── imagen9.svg
        └── logoGoogle.png
        └── logoIPLANbiz.png
    └── .gitignore
    └── firebase.json
    └── index.html
    └── package-lock.json
    └── package.json
    └── README.md
    └── vite.config.js
```

## Uso de la Aplicación

# Formulario de Preguntas:

- El usuario navega a través de un formulario de múltiples pasos con preguntas de selección, casillas de verificación y preguntas de ordenamiento.

- Formulario de Contacto:
  En la última sección, el usuario proporciona sus datos de contacto, los cuales son validados y luego almacenados en Firebase.

- Evaluación Personalizada:
  Después de responder las preguntas, el usuario recibe recomendaciones en base a sus respuestas, presentadas en pantalla.

- Generación y Descarga de PDF:
  La aplicación permite descargar las respuestas y recomendaciones en formato PDF.

- Contacto:
  Los usuarios pueden solicitar ser contactados para obtener más información sobre los servicios de IPLAN.

## Configuración y Despliegue

Para desplegar en Firebase Hosting:

- Inicializar Firebase:

```bash
firebase init
```

- Ejecutar el despliegue:

```bash
npm run deploy
```

## Consideraciones de Seguridad

- Se han actualizado las dependencias a sus últimas versiones estables para evitar vulnerabilidades de seguridad.

## Contact

If you have any questions or suggestions, feel free to get in touch at **cvarelagarcia@gmail.com.**

## Author

- [@VarelaCristianFacundo](https://github.com/VarelaCristianFacundo)
