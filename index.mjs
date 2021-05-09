import * as http from 'http'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 5000
const server = http.createServer(app)

server.listen(PORT, () => {
    console.info('server started on port:' + PORT)
})


