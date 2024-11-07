# Guía para Desplegar la Aplicación en Producción

Este documento proporciona una guía detallada sobre cómo desplegar la aplicación en un entorno de producción, incluyendo las mejores prácticas y consideraciones esenciales.

## 1. Preparativos Previos

Antes de proceder con el despliegue, asegúrate de cumplir con los siguientes requisitos:

- Una base de datos ya configurada y disponible, con un string de conexión válido.
- Acceso al servidor en el que se desplegará la aplicación (puede ser un VPS, una instancia de la nube o un servidor dedicado).
- Docker y Docker Compose instalados en el servidor.
- Node.js instalado para pruebas locales, si es necesario.

## 2. Pasos para el Despliegue

### Paso 1: Configurar el Entorno

1. **Configurar las Variables de Entorno**:
   - Crear un archivo `.env` en el servidor con el siguiente contenido, asegurándote de utilizar tu string de conexión de base de datos:
     ```env
     JWT_SECRET="password_secret_produccion"
     JWT_EXPIRATION=1h
     SHORT_TOKEN_EXPIRATION=5m
     MONGO_URI="<tu_string_de_conexion_a_la_db>"
     CAMBIO_API_URL=https://api.test.cambioseguro.com/api/v1.1/config/rates
     PORT=3000
     ```

### Paso 2: Transferir Archivos al Servidor

1. Utiliza `scp`, `rsync`, o un cliente FTP como FileZilla para transferir los archivos del proyecto al servidor.
2. Verifica que la estructura de archivos sea la siguiente:
   ```
   /ruta/al/proyecto/
   ├── node_modules/ (se generará al correr npm install)
   ├── src/
   ├── .env
   ├── docker-compose.yml
   ├── Dockerfile
   ├── package.json
   ├── package-lock.json
   └── README.md
   ```

### Paso 3: Construir y Ejecutar los Contenedores

1. **Construir la imagen de Docker**:

   ```bash
   docker-compose build
   ```

2. **Ejecutar los contenedores en segundo plano**:

   ```bash
   docker-compose up -d
   ```

3. **Verificar el estado de los contenedores**:

   ```bash
   docker ps
   ```

   Asegúrate de que los contenedores `api_rest` y `mongo` estén en ejecución.

### Paso 4: Exponer el Puerto en el Servidor

- Configura el servidor para que acepte conexiones en el puerto `5000` o el puerto que hayas configurado. Asegúrate de que el puerto esté abierto en el firewall:

  ```bash
  sudo ufw allow 5000/tcp
  ```

- Verifica que la aplicación sea accesible desde el navegador usando la URL `http://<IP_DEL_SERVIDOR>:5000`.

## 3. Consideraciones de Seguridad

- **Mantener Secretos Seguros**: Asegúrate de que el archivo `.env` no esté expuesto al público. Puedes agregarlo a `.dockerignore` para evitar que se copie accidentalmente en las imágenes de Docker.

- **Certificados SSL**: Si la aplicación se va a usar en producción, es recomendable usar HTTPS. Puedes configurar un proxy inverso como NGINX y obtener certificados SSL gratuitos con Let's Encrypt.

- **JWT Secret**: Utiliza un secreto fuerte y único para JWT en producción.

## 4. Documentación de la API

La documentación de la API se encuentra disponible en `http://<IP_DEL_SERVIDOR>:5000/api-docs` para facilitar la exploración y prueba de los endpoints.

## 5. Servicios y Rutas Implementadas

### Rutas de Autenticación

1. **POST /auth/token**: Genera un token de operación.
2. **POST /auth/register**: Registro de usuario.
3. **POST /auth/login**: Inicio de sesión.

### Rutas de Cambio

1. **POST /api/cambio**: Crea una solicitud de cambio.
2. **GET /api/cambio**: Lista todas las solicitudes de cambio.
3. **DELETE /api/cambio/{id}**: Elimina una solicitud de cambio.

## 6. Monitoreo y Mantenimiento

- **Revisar Logs**: Usa `docker logs <nombre_contenedor>` para revisar los logs y diagnosticar problemas.
- **Actualizar Dependencias**: Mantén las dependencias actualizadas y aplica parches de seguridad según sea necesario.

## 7. Notas Finales

Este proyecto está configurado para ser fácilmente extensible y desplegable. Para prototipos, esta configuración es adecuada, pero ten en cuenta aspectos de escalabilidad y rendimiento si planeas mover la aplicación a producción completa.

¡Con esto, tu aplicación estará lista para ser usada en un entorno de producción!

ok

