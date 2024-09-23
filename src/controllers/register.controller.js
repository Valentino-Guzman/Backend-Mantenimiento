import { pool } from "../config/database.config.js";
import { validateUser } from "../schemas/register.schema.js";
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
        const result = validateUser(req.body)

        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        
        const { email, contrasena } = result.data

        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
        if(rows.length > 0) {
            return res.status(400).json({ message: 'El email está en uso. Intente nuevamente con otro.' })
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10)

        await pool.query('INSERT INTO usuario (email, contrasena) VALUES (?, ?)', [email, hashedPassword])
        
        res.status(201).json({ message: 'Usuario creado correctamente'})

    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos o en el servidor.' })
    }
}