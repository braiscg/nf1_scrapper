const express = require('express')
const cors = require('cors')

const app = express()

app.get('/without-cors', (req, res, next) => {
    res.json({msg: 'Works! 🎉'})
})

app.get('/with-cors', cors(), (req, res, next) => {
    res.json({msg: 'Works! 🎉'})
})

const server = app.listen(3001, () => {
    console.log("Listening on port %s", server.address().port)
})
