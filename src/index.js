const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const method = require('method-override');
const session = require('express-session');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(method('_method'));
app.use(session({
    secret: myApp,
    resave: true,
    saveUninitialized: true
}));

//Global Vars

//Routes

//Static Files

//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});