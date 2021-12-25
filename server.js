const cors = require('cors')
require('dotenv').config()
const express = require('express')
const mongo = require('mongodb')

const MongoClient = mongo.MongoClient
const app = express()

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

let db
const dbConnectionStr = process.env.DB_STRING,
    dbName = process.env.DB_NAME,
    TODOS = 'todos'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        db = client.db(dbName)
        console.log(`Connected to ${dbName} database.`)
    })

app.get('/', (req, res) => {
    db.collection(TODOS).find().sort({priority: -1}).toArray()
    .then(data => {
        res.render('index.ejs', {todos: data})
    })
})

app.post('/api/add-todo', (req, res) => {
    db.collection(TODOS).insertOne({
        what: req.body.what,
        priority: req.body.priority
    })
    .then(result => {
        console.log('Todo added')
        res.redirect('/')
    })
    .catch(e => {console.error(e)})
})

app.delete('/api/delete-todo/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    db.collection(TODOS).deleteOne({
        _id: mongo.ObjectId(id)
    })
    .then(result => {
        console.log('Todo deleted')
        res.json('Todo deleted')
    })
    .catch(e => {console.error(e)})
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`)
})