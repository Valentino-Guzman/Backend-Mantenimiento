import express from 'express'
import cors from 'cors'
import routerRegister from './routes/register.routes.js'
import routerLogin from './routes/login.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.disable('x-powered-by')

app.use('/login', routerLogin)
app.use('/register', routerRegister)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro la ruta'
    })
})

export default app