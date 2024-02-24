const express = require('express')



const server = express()

server.get('/', (req, res) => {
    return res.json({ 'hello': 'world' })
})


server.listen(3000, () => console.log('Server was started'))