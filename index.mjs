import * as http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import { mongoURI } from './config/mongoDB.mjs'
import SubjectRoutes from './routes/SubjectRoutes.mjs'
import AdminAuthRoutes from './routes/AdminAuthRoutes.mjs'
import { PORT } from './Paths.mjs'
import dotenv from 'dotenv'
import { auth } from 'express-openid-connect'
import { AdminMiddleware } from './middlewares/AuthenticationMiddleware.mjs'


const app = express()
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(AdminMiddleware)
// app.use(
//     auth({
//         issuerBaseURL: process.env.ISSUER_BASE_URL,
//         baseURL: process.env.BASE_URL,
//         clientID: process.env.CLIENT_ID,
//         secret: process.env.SECRET,
//         idpLogout: true,
//     })
// );

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
app.use('/api/auth', AdminAuthRoutes)

const server = http.createServer(app)

server.listen(PORT, () => {
    console.info('server started on port: ' + PORT)
})
