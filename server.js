const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { connectToMongo } = require('./db');
const { Product } = require('./manager.mongo'); 
const { report } = require('./manager.mongo'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de sesiones
app.use(session({
    secret: '1234', // Cambia esto con una clave segura, actualmente 1234
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Duración de la cookie de sesión en milisegundos, se configuro 1 dia
    },
}));

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.post('/api/products', async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

app.get('/api/products', async (req, res, next) => {
    try {
        const { filter, sortAndPaginate } = req.query;
        const products = await Product.read({ filter, sortAndPaginate });
        res.json(products);
    } catch (error) {
        next(error);
    }
});

app.get('/api/products/:pid', async (req, res, next) => {
    try {
        const product = await Product.readOne(req.params.pid);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

app.put('/api/products/:pid', async (req, res, next) => {
    try {
        const updatedProduct = await Product.update(req.params.pid, req.body);
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

app.delete('/api/products/:pid', async (req, res, next) => {
    try {
        await Product.destroy(req.params.pid);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        next(error);
    }
});

app.get('/api/orders/total/:uid', async (req, res, next) => {
    try {
        const totalAmount = await report(req.params.uid);
        res.json({ totalAmount });
    } catch (error) {
        next(error);
    }
});


app.get('/', async (req, res, next) => {
    try {
        const products = await Product.find();

        res.render('home', { products });
    } catch (error) {
        next(error);
    }
});

// Manejadores de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectToMongo();