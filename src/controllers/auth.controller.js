import { JWT_SECRET } from '../config/dotenv.config.js';
import { pool } from '../config/database.config.js';
import { validateUser } from '../schemas/register.schema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const result = validateUser(req.body)

        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        
        const { email, contrasena, rol } = result.data

        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
        if(rows.length > 0) {
            return res.status(400).json({ message: 'El email está en uso. Intente nuevamente con otro.' })
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10)

        await pool.query('INSERT INTO usuarios (email, contrasena, rol) VALUES (?, ?, ?)', [email, hashedPassword, rol])
        
        res.status(201).json({ message: 'Usuario creado correctamente'})

    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error interno' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const result = validateUser(req.body)
        if(result.error) {
           return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const {email, contrasena} = result.data;
        
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
        if(rows.length === 0) {
            return res.status(401).json({ message: 'Error en la autenticación.' })
        }

        const user = rows[0]
        
        try {
            const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Credenciales incorrectas.' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error al verificar la contraseña.' });
        }

        const token = jwt.sign({ 
            id: user.id, email: user.email, rol:user.rol }, 
            JWT_SECRET, 
            {
                expiresIn: '24h'
            })

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token,
            user: { id: user.id, email: user.email, rol: user.rol }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos o en el servidor.' })
    }
}

