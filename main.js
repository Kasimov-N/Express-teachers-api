const express = require('express');
const app = express();
const data = require('./Data/data')

//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/', require('./Routes/index'))
app.use('/teachers', require('./Routes/Teacher'))

//localhost
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
})