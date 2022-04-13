var express =require('express')
let serverhandler=require('./serverhandler')


var app= express();
 app.use(express.json())
 app.use(express.urlencoded({ extended: false }))


app.set('view engine', 'ejs');

app.get("/",function(req,res){
    res.render('home')

})
app.post('/sign-up',function(req,res){
    
   let response= serverhandler.check_exiting_email(req.query.email)
   if(response){
       res.send('email exists')

   }else{
    serverhandler.save_data(req.query.email,req.query.passwd,req.query.username)
    res.send("data saved")
   }
})
app.post('/login',function(req,res){
    let response= serverhandler.validation(req.query.email,req.query.passwd)
    
    if(response=="valid info"){
            
            res.render('user',{user:req.query.email})
    }else{
        res.send(response)

    }

})




app.listen(3000)