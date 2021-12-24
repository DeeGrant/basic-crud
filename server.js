const cors = require('cors')
require('dotenv').config()
const express = require('express')
const MongoClient = require('mongodb').MongoClient

const app = express()

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

let db
const dbConnectionStr = process.env.DB_STRING,
    dbName = process.env.DB_NAME

MongoClient.connect(dbConnectionStr)
    .then(client => {
        db = client.db(dbName)
        console.log(`Connected to ${dbName} database.`)
    })

const PORT = process.env.PORT || 8000
app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`)
})