import { pool } from "../config/database.config.js";

export const getWorkOrder = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM orden_trabajo')
    res.json(result)
}