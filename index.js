console.log('app started');

const express = require('express')
const app =express()

const ejs = require ('ejs')
const mongoose = require('mongoose')
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))

 app.get('/',(request, response)=>{
     response.send("Hello! Welcome to this class")
})
let todo=[] // array called as a global variable and save the object inside array 

//create Schema for the collection below
let todoschema = mongoose.Schema({
    title:String,
    content:String
 }, {timeStamp:true})

const todomodel = mongoose.model("todo_collection", todoschema) 




//app.get('/',(request, response)=>{
// //     response.send([
// //         {Name: "Ayo", Class:"Node", },
// //         {Name: "Ayo", Class:"Node", }
// //     ])
// //     console.log('__dirname');
// // response.sendFile(__dirname+"/index.html")
// response.render("index",{name: "Jawad", gender: "Male"})
// })




// app.get("/todo",(req, res)=>{
//     res.render('Todo', {todo: todo}) //data can only be pass
// }) 

// app.get("/edit/:index", (req, res)=>{ 
//     const {index}= req.params
//     // console.log(index)
//     const detail = todo[index]
//     console.log(detail);
//     res.render("edit", {detail:detail, index:index})
// })


// app.post("/todo", (req, res)=>{
//     console.log(req.body);
//     const {title, content}  = req.body //to destructure 
//     const todo= todomodel.creste({title, content})
//     if (todo) {
//         console.log("data posted successfully"); 
//         res.render("todo",{message:"data posted successfully"}) 
//     } else{
//         console.log("error occured  while posting"); 
//     }
//     // todo.push({title, content}) //pushing title and content inside the new array
//     //  console.log({todo}); //check if the object have been pushed
//      //  res.redirect ('/todo')   //send a response

// })

app.post("/delete/:index", (req, res)=>{ 
    console.log(req.params);
    const {index}= req.params
    todo.splice(index, 1)
    res.redirect('/todo')
    
}) 
 


app.post("/update/:index", (req, res)=>{
    const {title, content} = req.body
    const {index} =req.params
    todo[index] = {title, content}
    res.redirect('/todo') 
})
 


app.get("/signup",(req, res)=>{
    res.render("signup")
})


const uri = "mongodb+srv://Olamide:Olamide01@cluster0.lr5a059.mongodb.net/node_class?retryWrites=true&w=majority&appName=Cluster0"
const connect = ()=> {
    try{
        const mongoconnect = mongoose.connect(uri)
        if(mongoconnect){
            console.log("connected to database");
        }  else {
            console.log("error occured"); 
        } 
    } 
    catch (error) {
        console.log(error)
    }
}

connect() 


let userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String, 
    password: String,
})

const userModel=mongoose.model("login_collection", userSchema)

app.get('./signup', (req, res)=>{
    res.render("signup")
})



app.post('./signup',(res, res)=>{
    console.log(req.body)
    let begin = new userModel(req.body)
    begin.save()
})


  

const port =7000
app.listen(port,()=>{
    console.log(`app started on port ${port}`);
})

