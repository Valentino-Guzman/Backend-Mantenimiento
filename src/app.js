import express from 'express'
import cors from 'cors'
import routerUsers from "../src/routes/users.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.disable('x-powered-by')

app.use(routerUsers)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro la ruta'
    })
})

export default app