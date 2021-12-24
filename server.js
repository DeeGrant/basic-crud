const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/js/main.js', (req, res) => {
    res.sendFile(__dirname + '/js/main.js')
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () =>
{
    console.log(`Server running on port ${PORT}`)
})