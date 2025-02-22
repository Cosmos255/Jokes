const { error } = require('console');
const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')    

const app = express();

const dataPath = path.join(__dirname, '/Data')

app.use(express.json())
app.use(cors())

class Joke{
    constructor(setup, punchline){
        this.joke = setup
        this.punchline = punchline
        this.id = Joke.getid()
        this.likes = 0
        this.dislikes = 0
    }

    static getid(){
        let dir = fs.readdirSync(dataPath)
        return dir.length + 1
    }

    static addJoke(req,res){
        try{
            let data = req.body
            let setup = data.setup
            let punchline = data.punchline

            let joke = new Joke(setup, punchline)

            let filePath = path.join(dataPath, joke.id + '.json')
            fs.writeFileSync(filePath, JSON.stringify(joke))
            res.end()

        }catch(err){
            res.status(500).json({error: "Failed to add joke" + err})
        }

    }   

    static getAllJokes(req,res){
        try{
            let allJokes = []
            let dir = fs.readdirSync(dataPath)
            for(let i=0; i<dir.length; i++){
                let filePath = path.join(dataPath, dir[i])
                let file = fs.readFileSync(filePath)
                let joke = JSON.parse(file)
                allJokes.push(joke)
            }
            res.json(allJokes)

        }catch(err){
            res.status(500).json({error: "Failed to get jokes" + err})
        }
    }

    static like(joke_id){
        let data = fs.readFileSync(path.join(dataPath, joke_id + '.json'))
        joke = JSON.parse(data)
        joke.likes += 1
        let filePath = path.join(dataPath, joke_id + '.json')
        fs.writeFileSync(filePath, JSON.stringify(joke))
    }

    static dislikes(joke_id){
        let data = fs.readFileSync(path.join(dataPath, joke_id + '.json'))
        joke = JSON.parse(data)
        joke.dislikes += 1
        let filePath = path.join(dataPath, joke_id + '.json')
        fs.writeFileSync(filePath, JSON.stringify(data))
    }
    
}


app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req,res) =>{
    res.send("<h1>Sup<h1>")
})

app.get('/Jokes', Joke.getAllJokes)

app.post('/Jokes', Joke.addJoke)

app.patch('/Jokes/:id/like', (req,res) =>{
    let joke_id = req.params.id
    Joke.like(joke_id)
    res.end()
})

app.patch('/Jokes/:id/dislike', (req,res) =>{    
    let joke_id = req.params.id
    Joke.dislikes(joke_id)
    res.end()
})


app.listen(3000, ()=>{
    console.log("Listening on port localhost:3000")
})
