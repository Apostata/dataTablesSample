var express = require('express');
var app = express();
var path = require('path');


app.set('views', path.join(__dirname, 'partials')); // here the .ejs files is in views folders
app.set('view engine', 'ejs'); //tell the template engine


app.use(express.static(path.join(__dirname +'/../public')))


app.get('/', function(req, res) {
    res.render(path.join(__dirname + '/../public/ejs/index.ejs'));
});


var port = 8383
app.listen(port,()=>{
    console.log(`Servidor funcionando na porta ${port}`);
});