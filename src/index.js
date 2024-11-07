
const express = require('express');
const path = require('path'); 
const authRoutes = require('./interfaces/routes/authRoutes');
const cambioRoutes = require('./interfaces/routes/cambioRoutes');
require('./infrastructure/database');

// Integración de Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml')); 

const app = express();
app.use(express.json());

// Rutas de la API
app.use('/auth', authRoutes);
app.use('/api', cambioRoutes);

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const { port } = require('./config/env');
app.listen(port, () => console.log(`Server running on port ${port}`));
