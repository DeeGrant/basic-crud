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

app.get('/', async (req, res) => {
    const todos = await db.collection(TODOS).find().sort({priority: 1}).toArray()
    res.render('index.ejs', {todos: todos})
})

app.post('/api/add-todo', async (req, res) => {
    try {
        const result = await db.collection(TODOS).insertOne({
            what: req.body.what,
            priority: Number(req.body.priority),
            complete: false
        })
        res.redirect('/')
    } catch (e) {
        console.error(e)
    }
})

app.delete('/api/delete-todo', async (req, res) => {
    try {
        const id = req.body.id
        const result = await db.collection(TODOS).deleteOne({
            _id: mongo.ObjectId(id)
        })
        res.json('Todo deleted')
    } catch (e) {
        console.error(e)
    }
})

app.put('/api/change-priority', async (req, res) => {
    try {
        const result = await db.collection(TODOS).updateOne({
            _id: mongo.ObjectId(req.body.id)
        },
        {
            $set: {
                priority: Number(req.body.priority) + Number(req.body.delta)
            }
        })
        res.json('Priority updated')
    } catch (e) {
        console.error(e)
    }
})

app.put('/api/complete', async (req, res) => {
    try {
        const result = await db.collection(TODOS).updateOne({
            _id: mongo.ObjectId(req.body.id)
        },
        {
            $set: {
                complete: true
            }
        })
        res.json('Complete Todo')
    } catch (e) {
        console.error(e)
    }
})

app.put('/api/redo', async (req, res) => {
    try {
        const result = await db.collection(TODOS).updateOne({
            _id: mongo.ObjectId(req.body.id)
        },
        {
            $set: {
                complete: false
            }
        })
        res.json('Redo Todo')
    } catch (e) {
        console.error(e)
    }
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`)
})