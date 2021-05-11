const express=require('express');
const bodyParser=require('body-parser');
const bcrypt = require(('bcrypt-nodejs'))
const cors=require('cors');
const knex=require('knex');


const register=require('./controllers/register.js');
const signin=require('./controllers/signin');
const id = require('./controllers/id');
const image = require("./controllers/image");

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test123',
    database : 'smartbrain'
  }
});
const app=express();

 


app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res)=>{res.send(database.user)})

//SIGNIN
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

//REGISTER
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

//PROFILEID
app.get('/profile/:id',(req,res)=>{id.handleId(req,res,db)})

//IMAGE
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post("/imageurl", (req, res) => {
  image.handleApicall(req, res);
});


app.listen(3000,()=>{
	console.log('app is ruuning');
})

// res this is working 
// signin --> post-->success/fail
// register--> post-->user new
// profile-->userid-->get-->userid
// image --> put--> updated userid
