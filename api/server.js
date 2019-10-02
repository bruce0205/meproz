import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';

const app = express();

const swaggerDefinition = {
  info: {
    title: 'Meproz Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the meproz routes',
  },
  // host: `${process.env.HOST_URL}:${process.env.HOST_PORT}`,
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const swaggerJSDocOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerJSDocOptions);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

require('./config/passport');

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: block }'
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('public'));
app.use(passport.initialize());

require('./routes/loginUser')(app);
require('./routes/registerUser')(app);
require('./routes/forgotPassword')(app);
require('./routes/resetPassword')(app);
require('./routes/updatePassword')(app);
require('./routes/updatePasswordViaEmail')(app);
require('./routes/findUsers')(app);
require('./routes/deleteUser')(app);
require('./routes/updateUser')(app);

module.exports = app;
