const express = require('express');
const path = require('path');
const app = express();
const port = process.env.port || 3000

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '/views/public')));

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/store', (req, res) => {
    res.render('store.ejs')
})

app.get('/account', (req, res) => {
    res.render('create-account.ejs')
})

app.get('/checkout', (req, res) => {
    res.render('checkout.ejs')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs')
})

app.get('/product-overview', (req, res) => {
    res.render('product-quickviews.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/account-manage', (req, res) => {
    res.render('account-manage.ejs')
})



app.listen(port, () => {
    console.log("Server open at port + ", port)
})