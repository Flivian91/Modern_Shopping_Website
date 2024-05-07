const express = require('express');
const path = require('path');
const app = express();
const port = process.env.port || 3000

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '/views/public')));

app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.listen(port, () => {
    console.log("Server open at port + ", port)
})