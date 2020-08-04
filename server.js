const express = require('express')
const bodyParser = require('body-parser')

const app = express()

let word = 'DAVID&nbsp;&nbspPINTAR&nbsp;&nbspNGGAK'

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send('index.html')
})

app.post('/guess',(req,res)=>{
    let char = req.body.id
    let occur = []
    for(let i = 0; i < word.length; ++i){
        if(word[i] == char){
            occur.push(i)
        }
    }
    let payload = JSON.stringify({
        id : char,
        pos : occur
    })
    res.send(payload)
})

app.get('/word',(req,res)=>{
    res.send({word : word})
})

app.listen(3000)