const express = require('express');
const port = 3000;
const app = express();
const usersRoutes = require('./routes/users');
const picturesRoutes = require('./routes/pictures');
const hbs = require('express-handlebars');
var path = require('path');

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: true}));
app.use('/users', usersRoutes);
app.use('/pictures',picturesRoutes)
app.engine('hbs', hbs.engine({extreme: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/',
runtimeOptions:{
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
}
}));
app.set('view engine', 'hbs');

app.listen(port);