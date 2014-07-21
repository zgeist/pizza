var express     = require('express'),
    handlebars  = require("handlebars"),
    fs          = require('fs');

var app = express();

// Configure server
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
    var tpl = fs.readFileSync("./templates/index.handlebars", "utf8"), d = {};

        d['ordered'] = '<span>Empty</span>';

        response.send(tpl);

});

app.get('/pizzas', function(request, response){

    fs.readFile('./server/pizzas.json', 'utf8', function(error, data) {
        if (error) {
            console.log('Error: ' + error);
            return;
        }
        response.send(data);
    });

});

app.get('/order', function(request, response){
    
    fs.readFile('./server/order.json', 'utf8', function(error, data) {
        if (error) {
            console.log('Error: ' + error);
            return;
        }
        response.send(data);
    });

});

app.listen(8080);
