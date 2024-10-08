
# Mission Reciclyng - Backend

## Descripción
El backend de **Mission Reciclyng** es responsable de manejar la lógica del servidor, las interacciones con la base de datos y las APIs que proveen funcionalidades para la plataforma de reciclaje. Este proyecto está desarrollado con [Node.js](https://nodejs.org/) y utiliza [Express](https://expressjs.com/) como framework para la creación de la API.

## Características
- API RESTful para gestionar las funcionalidades principales de la aplicación.
- Conexión a base de datos relacional (MySQL).
- Gestión de usuarios y autenticación (JWT).
- Gestión de residuos, recolección y seguimiento de reciclaje.
- Websockets para funcionalidades en tiempo real como notificaciones.

## Requisitos previos
Para ejecutar este proyecto en tu máquina local, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) v18.x o superior
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Base de datos (MySQL, XAMPP)
- [Git](https://git-scm.com/)

## Instalación

### 1. Clonar el repositorio
Clona el repositorio del proyecto a tu máquina local:

```bash
git clone https://github.com/ramos29pages/ms-back.git
```

### 2. Instalar dependencias
Una vez clonado el repositorio, navega a la carpeta del proyecto e instala las dependencias necesarias usando `npm`:

```bash
cd mission-recisclyn-backend
npm install
# o si usas yarn
yarn install
```

### 3. Configuración del entorno
Crea un archivo `.env` en la raíz del proyecto basado en el archivo `.env.example` que se encuentra en el repositorio. Llena los valores necesarios como la configuración de la base de datos, JWT, y otros parámetros de configuración.

```bash
cp .env.example .env
```

Variables de entorno comunes:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=db
JWT_SECRET=twt
PORT=3000
```

### 4. Migraciones de base de datos
El proyecto NO incluye un sistema de migraciones de base de datos.

### 5. Ejecutar el servidor en modo desarrollo
Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

El backend estará corriendo en `http://localhost:3000`.

## Estructura del proyecto

```plaintext
.
├── src
│   ├── controllers   # Lógica de los controladores para las rutas
│   ├── middlewares   # Middleware de autenticación, validaciones, etc.
│   ├── models        # Modelos de datos (ORM o base de datos)
│   ├── routes        # Definición de rutas
│   ├── services      # Servicios que manejan la lógica del negocio
│   ├── utils         # Utilidades generales
│   └── app.js        # Punto de entrada principal del servidor
├── .env              # Ejemplo de archivo de configuración
├── package.json      # Dependencias y scripts del proyecto
└── README.md         # Este archivo
```

## Scripts disponibles
En el `package.json` hay varios scripts útiles para la gestión del proyecto:

- **`npm run dev`**: Ejecuta el servidor en modo desarrollo con recarga automática.
- **`npm run start`**: Inicia el servidor en producción.

## Tecnologías utilizadas
- **Node.js**: Entorno de ejecución de JavaScript en el lado del servidor.
- **Express**: Framework web minimalista para Node.js.
- **Sequelize/TypeORM** (opcional): ORM que se usará para gestionar la base de datos.
- **JWT**: Autenticación con tokens JSON Web Tokens.
- **Socket.IO** (obligatorio): Para comunicaciones en tiempo real (Websockets).

## Contribuciones
Las contribuciones son bienvenidas. Si deseas colaborar, por favor, abre un **issue** o envía un **pull request**. Asegúrate de seguir las guías de estilo y de testear el código antes de enviarlo.

## Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más información.
