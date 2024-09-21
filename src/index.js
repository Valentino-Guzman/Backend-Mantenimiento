import { PORT } from './config/dotenv.config.js'
import app from "./app.js";

app.listen(PORT, () => {
    console.log(`El servidos se abrió en el puerto: http://localhost:${PORT}`)
})