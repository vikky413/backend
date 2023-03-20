const express = require("express");
const path = require("path");
const app = express();
// const hbs = require("hbs")
const ejs = require("ejs")
require("./db/connect")
const userModel = require('./models/student')


const port = process.env.PORT || 5000;

const static_path = path.join(__dirname, "../public");
const temp_path = path.join(__dirname, "../templates/views");
// const part_path = path.join(__dirname, "../templates/partials");
// const part_path = path.join(__dirname, "../templates/partial");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(express.static(static_path));
app.set("view engine", "ejs");
app.set("views", temp_path)
// ejs.registerPartials(part_path);


app.get("/", (req, res) =>{
    res.render("index")
});


app.get('/signup', function(req, res, next) {

    res.render('signup', { title: 'Password Management System', msg:'' });
  });
  app.post('/signup',function(req, res, next) {
          var username=req.body.uname;
          var email=req.body.email;
          var password=req.body.password;
          var confpassword=req.body.confirmpassword;
    if(password !=confpassword){
      res.render('signup', { title: 'Password Management System', msg:'Password not matched!' });
     
    }else{
     
          var userDetails=new userModel({
            username:username,
            email:email,
            password:password,
            confirmpassword:confpassword
          });
       userDetails.save((err,doc)=>{
          if(err) throw err;
          res.render('signup', { title: 'Password Management System', msg:'User Registerd Successfully' });
       })  ;
      } 
  
    
  });

app.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
});

