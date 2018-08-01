const colors = require(`colors`)
const express = require(`express`)
const cors = require(`cors`)
const bodyParser = require(`body-parser`)


let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let messages = []


app.get(`/`, function(req, res){
    res.send(`Hello World for the Messages Place!`)
})

app.post(`/message`, function(req, res){

    console.log(req.body.text)

    messages.push({
        text: req.body.text,
        user: req.body.user,
        time: req.body.time,
    })

    res.send(messages)
})

app.get(`/message`, function(req, res){
    res.send(messages)
})

/* NEED TO HAVE A GET WITH A  */

function mapping(req,res,next,Time){
    console.log(req.param);
    
    next();
}

app.param("message", mapping );

app.get("/message", function(req,res){
    res.send(messa);
});


app.delete(`/message`, function(req, res){
    res.send(`DELETE request to homepage`)

    messages.splice(req.body.id, 1)
    
}) 
  


app.listen(1337, function(){
    console.log(`Example app listening on port 1337!`.rainbow.bgBlack)
})