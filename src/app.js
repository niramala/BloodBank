
require('./db/mongoose')
const User=require('./models/users')
const Blood=require('./models/blood')
/*
const data= new Blood({
    blood_group:'A+',
    available_unit:'123'
})
data.save(
Blood.find({},(err,data) => {
        //res.render('userhome',{data})
        console.log(data.toString())
})*/

const path=require('path')
const express=require("express")
const hbs=require('hbs')
const joi=require('joi')
const mongodb=require('mongodb')
const session=require('express-session');
const flash =require('express-flash-messages');
const app=express()


app.use(session({
    secret:'secret123',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());




// Define Paths for express
publicDirectoryPath=path.join(__dirname,'../public')
viewsPath=path.join(__dirname,'../templates/views')
partialsPath=path.join(__dirname,'../templates/partials')

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

// Set up habdlebars and views locations 
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Body Parser
app.use(express.urlencoded ({extended: false}));

// Set up homepage
app.get('',(req, res) => {
    res.render('index',{
        title:"blood bank",
        space:"            "

    })
})

// Set up about page
app.get('/about',(req,res) =>{
    res.render('about',{
        title:"about blood bank"
    })
})

//Set up contact page
app.get('/contact',(req,res) => {
    res.render('contact',{
        title: "          "
    })
})

//Set up register page
app.get('/register',(req,res) => {
    res.render('register',{

    })
})


// Register handle
app.post('/register',(req,res) => {
    const{ name,utype,email,pwd,cpwd,phn,bg,addr} =req.body;
    let errors =[];
    console.log(req.body)
    if(errors.length>0)
    {
        res.render('register',{
            errors
        });
    }
    else
    {
        User.findOne({email:email}).then( user =>{
            if(user)
            {
                errors.push( "Email already exists");
                res.render('register',{
                    errors,
                    name,
                    utype,
                    addr,
                    bg,
                    phn
                });
            }
            else
            {
            
                const newUser= new User({
                    name: name ,
                    email: email,
                    phone:  phn,
                    address:  addr,                   
                    user_type : utype ,
                    password: pwd,
                    blood_group: bg
            
                });
                newUser.save().then(user => {
                res.redirect('/login');
                }).catch((error) => {
                console.log(error)                
                })
            }
       })
    }
});

//log in handle
app.post('/login',(req,res) => {
    const {email,pwd}=req.body
    let errors=[]
    if(errors.length>0)
    {
        res.render('login',{
            errors
        });
    }
    else
    {

        if(!email || !pwd)
        {
            errors.push("Please enter the credentials")
            //console.log(res.locals.getMessages())
            res.render('login',{ errors })
        }
    
        else if(email==='admin@gmail.com' && pwd==='admin')
            res.redirect('/adminhome')
        else
        {
            User.findOne({email: email},(err,usr) => { console.log(usr.email)
            if(!email)
            {
                errors.push("User Not found")
                res.render('login',{ errors,email })
            }
        
           else if(usr.password!=pwd)
            {
                errors.push("Username and password doesnot matched")
                res.render('login',{ errors, email})
            }
            else
                res.redirect('/userhome')
            console.log(usr.email+"  : "+ pwd)
            })
        }   
    }
});

app.post('/find',(req,res) => {
    const{bg,addr}=req.body;
    let errors=[];
    if(!bg || !addr)
        {
            errors.push("Please enter the fieldss")
            //console.log(res.locals.getMessages())
            res.render('find',{ errors })
        }
    User.find({blood_group:bg,address:addr,user_type:"donar"},(err,data) =>{
        res.render("founddonar",{data})
    })
})

app.post('/update',(req,res) => {
    const{bg,au}=req.body;
    let errors=[];
    if(!bg || !au)
        {
            errors.push("Please enter the fields")
            //console.log(res.locals.getMessages())
            res.render('update',{ errors })
        }
    Blood.update({blood_group:bg},{available_unit:au},{new:true},(err,data) =>{
        if(err) throw err
        Blood.find((err,data)=> {
            res.render("admincheckavailability",{data})
            console.log(data)
        })
        

    })/*.then(()=>{
        res.render("admincheckavailability",{data})
    })*/
})

// Set up Adminhome
app.get('/adminhome',(req,res) => { 
    res.render('adminhome')
});

app.get('/userhome',(req,res) => {
    res.render('userhome',{ })
});

app.get('/checkavailability',(req,res)=>
{
    Blood.find({},(err,data) => {
        res.render('checkavailability',{data})
   })
   // res.render('userhome',{ })
})

app.get('/admincheckavailability',(req,res)=>
{
    Blood.find({},(err,data) => {
        res.render('admincheckavailability',{data})
        
    })
   // res.render('userhome',{ })
})

app.get('/find',(req,res) =>{
    res.render('find')
})

app.get("/update",(req,res) =>{
    res.render('update')
})

//mongodb+srv://Niramala:<Mongodb123>@projectdb.u6v63.mongodb.net/<BloodBank>?retryWrites=true&w=majority 

//Set up login page
app.get('/login',(req,res) => {
    res.render('login',{

    })
})

//Set up 404 page
app.get('*',(req,res) => {
    res.render('404Page',{
        
    })
})


app.listen(8080,() => {
    console.log("server is up on port 8080")

})