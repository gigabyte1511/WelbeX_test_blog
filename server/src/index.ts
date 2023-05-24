import express from 'express'
import sequelize from './models/index'
import postRouter from './routes/postRouter'
import userRouter from './routes/userRouter'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const server = express()
const PORT = process.env.SERVER_PORT

server.use(cors())
// sequelize.sync({ force: true })
sequelize.sync({ alter: true })
    .then(() => {
        console.log('The DB has been succesfuly synced')
    })
    .catch((err: { message: string }) => {
        console.log(`Failed to sync DB: ${err.message}`)
    })

server.use(express.json())

server.use('/api/v0.1/post', postRouter)
server.use('/api/v0.1/user', userRouter)

server.get('/', (req, res) => {
    res.send('<h2>MyIOT API</h2>')
})

server.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
})
