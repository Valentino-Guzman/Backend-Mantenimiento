import express from 'express'
import cors from 'cors'
import auth from "../src/routes/auth.routes.js"
import user from "../src/routes/user.routes.js"
import {verifyToken, isAdmin} from "./middlewares/auth.middlewares.js"

const app = express()

app.use(cors())
app.use(express.json())
app.disable('x-powered-by')

app.use(auth)
app.use(user)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro la ruta'
    })
})

export default app