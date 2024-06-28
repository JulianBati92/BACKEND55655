import winston from 'winston';

// Definir los niveles de log
const levels = {
  http: 0,
  info: 1,
  error: 2,
  fatal: 3,
};

// Colores para los diferentes niveles de log
const colors = {
  http: 'blue',
  info: 'green',
  error: 'red',
  fatal: 'bold red',
};

// Crear el logger
const logger = winston.createLogger({
  levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
  ],
  level: 'http',
});

// Registrar los colores para cada nivel
winston.addColors(colors);

export default logger;
