var express = require('express')
var mongo = require('mongodb').MongoClient
var path = require('path')
var math = require('mathjs')
var bodyParser = require('body-parser')
var app = express()
var mongouri = 'mongodb://' + process.env.USER + ':' + process.env.PASS + '@' + process.env.HOST + ':' + process.env.PORT + '/' + process.env.DB;

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/form', function (request, response) {
  mongo.connect(mongouri, function (err, db) {
    if (err) throw err
    var newEntry = [{
      "nome": request.body.nome,
      "email": request.body.email,
      "profissao": request.body.profissao,
      "aluno": request.body.aluno
    }]
    db.collection('cadastros').insert(newEntry, function (err, result) {
      if (err) throw err
      console.log(result)
      db.close()
    })
    response.sendFile(__dirname + '/thanks.html');
  }
  )
})


app.get("/", function (request, response) {
    response.sendFile(__dirname + '/index.html');
  })

var listener = app.listen(3000, () => {
  console.log('Listening on port ' + listener.address().port);
})
