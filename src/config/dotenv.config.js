import { config } from 'dotenv';

config()

export const PORT = process.env.PORT || 1234
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || '7410056Chino!'
export const DB_DATABASE = process.env.DB_DATABASE || 'utn_mantenimiento'
export const DB_PORT = process.env.DB_PORT || 3306

export const JWT_SECRET = 'X7$h&9pJ3$*Ln3Vf5%WkQ!#RzB8dYxCt7@q6JvP'