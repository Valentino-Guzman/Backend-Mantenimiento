import { pool } from "../config/database.config.js";

export const getUsers = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuarios;')
        res.json(result) 
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error interno' })
    }
    
}

export const getUsersById = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM usuarios WHERE id = ?;', [req.params.id])
            if(result.length <= 0) {
                res.json({
                    message: 'No se encontró el usuario'
                })
            }   
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error interno' })
    }
    
}

export const deleteUser = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?;', [req.params.id])
        if(result.affectedRows <= 0) {
            res.json({
                message: 'No se encontró el usuario'
            })
        }
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error interno' })
    }

}