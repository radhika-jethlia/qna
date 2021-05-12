import * as http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import { mongoURI } from './config/mongoDB.mjs'
import SubjectRoutes from './routes/SubjectRoutes.mjs'
import { PORT } from './Paths.mjs'

const app = express()
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use('/uploads', express.static('upload'))

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.info('Database connected')
    })
    .catch(err => {
        console.error('Connection to database failed')
    })

app.use('/api/subjects', SubjectRoutes)

const server = http.createServer(app)

server.listen(PORT, () => {
    console.info('server started on port: ' + PORT)
})


