//Requires
const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const method = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

//Initializations
const app = express();
require('./database');

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
    secret: 'myApp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.successMsg = req.flash('successMsg');
    res.locals.errorMsg = req.flash('errorMsg');
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});