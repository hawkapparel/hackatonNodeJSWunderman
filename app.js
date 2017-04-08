var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var path = require('path');
var app = express();
var fs = require('fs');

// Connection to DB
mongoose.connect('mongodb://localhost/clients', function(err, res) {
 if(err) throw err;
 console.log('Connected to Database');
});

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

// Import Models and Controllers
var models     = require('./models/client')(app, mongoose);
var ClientCtrl = require('./controllers/clients');

var router = express.Router();

var layout = fs.readFileSync('views/index.html', 'utf8')

// Index - Route

app.use(router);

router.get('/', function(req, res) {
   res.send(layout);
});


// API routes
var api = express.Router();

api.route('/clients')  
  .get(ClientCtrl.findAll)
  .post(ClientCtrl.add);

api.route('/clients/:id')  
  .get(ClientCtrl.findById)
  .put(ClientCtrl.update)
  .delete(ClientCtrl.delete);

api.route('/clients/name/:name')  
  .get(ClientCtrl.findByName);

app.use('/api', api);  


// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});