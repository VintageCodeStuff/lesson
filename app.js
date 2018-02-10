var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('localhost:27017/testDB', ['votes', 'accounts'])

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/confession', function (req, res, next){
    var text = req.body.text;
    var name = req.body.name;

    db.confession.insert({
        name: name,
        text: text,
        createdAt: Date.now()
    }, function(err, doc){
        if (err){
            err.status = 403;
            res.send(err);
        } else {
            res.send({status: 200, data: doc});
        }
    });
});
)
app.post('/account/update', function(req,res){
    var name = req.body.oldname
    var newname = req.body.newname
    if(name !=null) {
        db.accounts.find({name: name}, function(err,docs) {
            if(docs.length >0) {
                db.accounts.update({name: name}, {$set:{name: newname}}, function (err, docs) {
                    res.send({'status': "updated"});
                })
            } else {
                res.send( {"status": "error"});

            }
        
        })
    }

}
)
app.get('/account/:name', function(req, res) {
    db.accounts.find({name: req.params.name},
      function(err, docs) {
        if(docs.length > 0) {
          res.send({'status': 'success', 'person': docs[0]});
        } else {
          res.send({'status': 'error'});
        }
      }
    );
  });


app.delete('/account/:name', function(req, res) {
    db.accounts.find({name: req.params.name}).remove(),
    db.accounts.remove({name: req.params.name}),
    db.accounts.find({name: req.params.name}).removeOne(),
          res.send({'status': 'success'});
        }
      
    );
  ;


app.listen(8080)