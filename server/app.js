var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var app = express();
app.use(express.json());
var db = mongojs('localhost:27017/testDB', ['confessions']);

app.post('/confession', function(req,res){
    var text = req.body.text;
    var date = new Date();
    if(text !=null) {
        db.confessions.insert({text : text, createdat: date });
        res.send( {"status": "success"});
    }
    
});
    

app.get('/confessions/all', function(req,res){  

    db.confessions.find(function(err,docs) {
        res.send( {"status": "success" , "data": docs });
    })
});
    
app.listen(8080,function(){
    console.log('yey')
});
