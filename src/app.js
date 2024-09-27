import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import auth from "../src/routes/auth.routes.js"
import user from "../src/routes/user.routes.js"
import {isAdmin} from "./middlewares/auth.middleware.js"
import { verifyTokenCookie } from './middlewares/cookies.middleware.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.disable('x-powered-by')
app.use(auth)
app.use(user) 

app.get('/usuario', verifyTokenCookie, (req, res) => {
    res.json({ message: 'Bienvenido, usuario', user: req.user });
  });
  
  app.get('/admin', verifyTokenCookie, isAdmin, (req, res) => {
    res.json({ message: 'Bienvenido, admin', user: req.user });
  });

app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro la ruta'
    })
})

export default app