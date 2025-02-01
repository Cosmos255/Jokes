const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express();

const dataPath = path.join(__dirname, '/Data')

app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req,res) =>{
    res.send("<h1>Sup<h1>")
})


app.get('/Jokes', getAllJokes)

app.post('/Jokes', addJokes)

function getAllJokes(req,res){
    let dir = fs.readdirSync(dataPath)
    let allJokes = []
    for(let i=0; i<dir.length; i++){
        let filePath = path.join(dataPath, dir[i])
        let file = fs.readFileSync(filePath)
        let joke = JSON.parse(file)
        joke.id = i
        allJokes.push(joke)
    }
    res.JSON(allJokes)
}

function addJokes(req,res){
    let data = ''
    req.on('data', chunk =>{
        data += chunk
    })
    req.on('end', ()=>{
        let joke = JSON.parse(data)
        joke.likes = 0
        joke.dislikes = 0

        let filePath = path.join(dataPath, joke.id + '.json')
        fs.writeFileSync(filePath, JSON.stringify(joke))
        res.end()
    })
}



app.listen(3000, ()=>{
    console.log("Listening on port localhost:3000")
})
