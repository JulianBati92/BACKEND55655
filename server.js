import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import router from './src/routers/index.router.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import fs from 'fs';
import path from 'path'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;

const ready = () => {
    console.log(`Server ready on port ${PORT}`);
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

// Configuración de Handlebars
const hbs = exphbs.create({ extname: '.handlebars' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));
app.use('/', router);  

// Configuración de WebSockets
io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    // Emitir productos al cliente
    socket.emit('products', getAllProducts());

    // Recepción de nuevo producto desde el formulario
    socket.on('new product', (newProduct) => {
        saveProduct(newProduct);
        // Emitir todos los productos actualizados al cliente
        io.emit('products', getAllProducts());
    });
});

// Funciones para manejar productos (móvelas fuera del archivo server.js si es posible)
const productsFilePath = __dirname + '/src/data/products.json';

function getAllProducts() {
    try {
        const productsData = fs.readFileSync(productsFilePath, 'utf-8');
        return JSON.parse(productsData);
    } catch (error) {
        console.error('Error reading products file:', error.message);
        return [];
    }
}

function saveProduct(newProduct) {
    const currentProducts = getAllProducts();
    currentProducts.push(newProduct);

    try {
        fs.writeFileSync(productsFilePath, JSON.stringify(currentProducts, null, 2));
        console.log('Product saved successfully:', newProduct);
    } catch (error) {
        console.error('Error writing products file:', error.message);
    }
}

server.listen(PORT, ready);