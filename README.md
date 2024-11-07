# 🛠️ Reto Técnico Mario CH

📄 Este documento describe cómo levantar y ejecutar el proyecto de manera completa y detallada, asegurando que cualquier desarrollador pueda trabajar con él sin problemas. El proyecto está completamente configurado para ejecutarse en un entorno Docker.

## 📝 Descripción

El proyecto es una API REST que permite la gestión de usuarios y la generación de tokens 🔑 seguros con funcionalidades de registro, autenticación y consultas de cambios. Implementa autenticación JWT y está desarrollado utilizando Node.js, Express y MongoDB.

## 🗂️ Estructura del Proyecto

```
📁 reto_tecnico_mario_ch/
├── 📂 node_modules/
├── 📂 src/
│   ├── 📂 application/
│   │   ├── 📄 authUseCase.js
│   │   ├── 📄 authValidation.js
│   ├── 📂 config/
│   │   └── 📄 env.js
│   ├── 📂 domain/
│   │   ├── 📄 userModel.js
│   │   ├── 📄 cambioModel.js
│   │   └── 📂 repositories/
│   │       ├── 📄 userRepository.js
│   │       └── 📄 cambioRepository.js
│   ├── 📂 infrastructure/
│   │   ├── 📄 authService.js
│   │   ├── 📄 database.js
│   │   
│   ├── 📂 interfaces/
│   │   ├── 📂 controllers/
│   │   │   ├── 📄 authController.js
│   │   │   └── 📄 cambioController.js
│   │   ├── 📂 routes/
│   │   │   ├── 📄 authRoutes.js
│   │   │   └── 📄 cambioRoutes.js
│   │   └── 📂 middlewares/
│   │       └── 📄 authMiddleware.js
│   └── 📄 index.js
├── 📄 .env
├── 📄 .dockerignore
├── 📄 docker-compose.yml
├── 📄 Dockerfile
├── 📄 nodemon.json
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 README.md
└── 📄 swagger.yaml
```

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener los siguientes componentes instalados:

- [🐋 Docker](https://www.docker.com/products/docker-desktop)
- [🐳 Docker Compose](https://docs.docker.com/compose/install/)

## 🌐 Configuración del Entorno

### 📄 Archivo .env

El proyecto utiliza un archivo `.env` para almacenar variables de entorno. Un ejemplo de archivo `.env` es el siguiente:

```env
🔐 JWT_SECRET="password_secret"
⏳ JWT_EXPIRATION=1h
⏳ SHORT_TOKEN_EXPIRATION=5m
🗄️ MONGO_URI="mongodb://mongo/mydatabase"
🌐 CAMBIO_API_URL=https://api.test.cambioseguro.com/api/v1.1/config/rates
📦 PORT=3000
```

Asegúrate de que el archivo `.env` esté en la raíz del proyecto.

## 🚀 Instrucciones de Ejecución

### 🛠️ Paso 1: Construir la Imagen de Docker

Ejecuta el siguiente comando en la raíz del proyecto para construir la imagen de Docker:

```bash
🐚 docker-compose build
```

### 🏃 Paso 2: Levantar los Contenedores

Para iniciar los servicios, ejecuta:

```bash
🐚 docker-compose up
```

Esto iniciará tanto el contenedor de la API como el de la base de datos MongoDB. La API estará disponible en `http://localhost:5000` y la documentación de Swagger en `http://localhost:5000/api-docs`.

### 🛑 Paso 3: Detener los Contenedores

Para detener los contenedores en ejecución, utiliza:

```bash
🐚 docker-compose down
```

## 🔗 Servicios y Rutas Implementadas

### 🔑 Rutas de Autenticación

1. **Generar Token de Operación**
   - **Endpoint**: `POST /auth/token`
   - **Body**:
     ```json
     {
       "operation": "login" | "register"
     }
     ```
   - **Respuesta**:
     ```json
     {
       "token": "<token>",
       "message": "Token generado",
       "status": true
     }
     ```

2. **Registro de Usuario**
   - **Endpoint**: `POST /auth/register`
   - **Headers**:
     ```
     Authorization: Bearer <token>
     ```
   - **Body**:
     ```json
     {
       "email": "example@mail.com",
       "password": "ExamplePassword@123"
     }
     ```
   - **Respuesta Exitosa**:
     ```json
     {
       "message": "Usuario registrado exitosamente",
       "status": true
     }
     ```
   - **Error de Duplicado**:
     ```json
     {
       "message": "Este nombre de usuario ya está en uso. Por favor elige otro.",
       "status": false
     }
     ```

3. **Inicio de Sesión**
   - **Endpoint**: `POST /auth/login`
   - **Headers**:
     ```
     Authorization: Bearer <token>
   - **Body**:
     ```json
     {
       "email": "example@mail.com",
       "password": "ExamplePassword@123"
     }
     ```
   - **Respuesta Exitosa**:
     ```json
     {
       "message": "Login exitoso",
       "token": "<token>",
       "status": true
     }
     ```
   - **Error de Validación**:
     ```json
     {
       "message": "Login fallido",
       "error": "Detalles de validación",
       "status": false
     }
     ```

### 💱 Rutas de Cambios

1. **Crear Solicitud de Cambio**
   - **Endpoint**: `POST /api/cambio`
   - **Headers**:
     ```
     Authorization: Bearer <token>
     ```
   - **Body**:
     ```json
     {
       "tipo_de_cambio": "venta",
       "monto_enviar": 50
     }
     ```
   - **Respuesta Exitosa**:
     ```json
     {
       "message": "Solicitud de cambio creada",
       "status": true,
       "data": {
         ...
       }
     }
     ```

2. **Listar Solicitudes de Cambio**
   - **Endpoint**: `GET /api/cambio`
   - **Headers**:
     ```
     Authorization: Bearer <token>
     ```
   - **Respuesta Exitosa**:
     ```json
     {
       "message": "Lista de solicitudes de cambio",
       "status": true,
       "data": [
         ...
       ]
     }
     ```

3. **Eliminar Solicitud de Cambio**
   - **Endpoint**: `DELETE /api/cambio/{id}`
   - **Headers**:
     ```
     Authorization: Bearer <token>
     ```
   - **Respuesta Exitosa**:
     ```json
     {
       "message": "Solicitud de cambio eliminada",
       "status": true
     }
     ```
   - **Error**:
     ```json
     {
       "message": "Solicitud de cambio no encontrada o no autorizada",
       "status": false
     }
     ```

## 📚 Documentación de API

La documentación de la API está disponible en `http://localhost:5000/api-docs`, donde se puede visualizar y probar todas las rutas usando Swagger.

## ⚠️ Consideraciones Finales

- Asegúrate de que los puertos `5000` y `27018` estén libres en tu sistema antes de iniciar el proyecto.
- Revisa los logs de Docker si surge algún problema con los comandos `docker logs <nombre_contenedor>`.

Con estas instrucciones, un desarrollador podrá levantar y probar el proyecto de manera efectiva.

✅

