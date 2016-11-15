console.log('Coding is fun and cool okie')

const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs')

const MongoClient = require('mongodb').MongoClient
const env = require('./env')

var db

MongoClient.connect('mongodb://'+env.username+':'+env.password+'@ds047146.mlab.com:47146/yoda-quotes', (err, database) => {

	if (err) return console.log(err)
	db = database

	app.listen(3000, function () {
		console.log('listening on 3000')
	})
})

app.get('/', function(req,res) {
	db.collection('quotes').find().toArray((err, results) => {
		if (err) return console.log(err)
		//render index.ejs
		res.render('index.ejs', {quotes: results})
	})

})

app.post('/quotes', (req,res) => {

	db.collection('quotes').save(req.body, (err,results) => {
		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')
	})

})