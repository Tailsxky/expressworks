var express = require('express');
var bodyparser = require('body-parser');
var fs = require('fs');
var app = express();

app.set('views', './public'); 
app.set('view engine', 'pug');

/* Exercise 5 */
app.use(require('stylus').middleware(__dirname + '/public'));

/* Exercise 2 */
//app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({extended: false}));

app.post('/form',function(req,res){
    res.end(req.body.str.split('').reverse().join('')); /* Excercise 4 */
});

app.get('/home',function(req,res){
    
    //res.end('Hello World!'); /* Exercise 1 */

    res.render('index', {date: new Date().toDateString()}); /* Exercise 3 */
});

/* Exercise 6 */
app.put('/message/:id',function(req,res){
    res.send(require('crypto')
    .createHash('sha1').update(new Date().toDateString() + req.params.id)
    .digest('hex'));
});

/* Exercise 7 */
app.get('/search', function(req,res){
    res.send(req.query);  
    //req.query saves the parameters following search? in the URL;
});

/* Exercise 8 */
app.get('/books',function(req,res){
    fs.readFile(process.argv[3],function(err, data){
        if(err){
            throw err;
        }
        res.send(JSON.parse(data));
        
    });

});

app.listen(process.argv[2]);