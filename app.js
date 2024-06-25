const express = require('express');
const morgan = require('morgan');

const app = express();

// Set the port
//const PORT = process.env.PORT || 3000;

// Register view engine
app.set('view engine', 'ejs');

// Middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// In-memory products array
let products = [];

// Morgan logging middleware
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Product App', products });
});

app.post('/add-product', (req, res) => {
    const { name, price, quantity } = req.body;
    products.push({ name, price, quantity });
    res.redirect('/');
});

// Error handling middleware
app.use((req, res) => {
    res.status(404).render('error', { title: 'Error 404' });
});

// Start the server
const PORT = process.env.PORT || 3000; // Change to a different port number, e.g., 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
