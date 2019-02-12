var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// BodyParser is gonna take JSON and convert it into an Object
// .json() returns a function which is the middleware we give to express.
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((d) => {
    res.send(d);
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos to read Todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET /todos/123434234234
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)){
    res.status(404).send({})
  };

  Todo.findById(id).then((todo) => {
    if (!todo){
      res.status(404).send({});
    }
    res.send({todo})
  }, (e) => res.status(400).send({}));
});

app.listen(3000, () => {
  console.log('Started on port 3000!');
});

module.exports = {app};
