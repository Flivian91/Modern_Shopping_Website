const express = require('express');
const path = require('path');
const app = express();
const port = process.env.port || 3000
const {connectToMongoDB} = require('./config/connectToMongo')
const {main} = require('./controllers/registerUser')
const argon2 = require('argon2')

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '/views/public')));
// Middleware to parse url-encoded form data
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/store', (req, res) => {
    res.render('store.ejs')
})

app.get('/account', (req, res) => {
    res.render('account.ejs')
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

//connectToMongoDB()

app.post('/account/create-account', async (req, res) =>{

    const user = await req.body
    console.log(user)
    const password = await user.password
    const confirmPassword = await user.confirmPass

    console.log("Password is:  " + password + "Confirm pass is: " + confirmPassword)
    if(password === confirmPassword){
        try{
            const hashPass = await argon2.hash(password);
            delete user.confirm-password
            await main(user)
            console.log("data inserted successfully")
        }
        catch(error){
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                // Duplicate email error
                console.error('Email already exists:', error.keyValue.email);
        }
        else{
            console.log("Erro : " + error)
        }
    }
    }

    else{
        console.log("Pass words must match");
    }
})

app.listen(port, () => {
    console.log("Server open at port + ", port)
})