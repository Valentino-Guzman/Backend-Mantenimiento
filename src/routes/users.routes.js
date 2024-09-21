import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUsers } from "../controllers/users.controller.js";

const router = Router()

router.get('/usuarios', getUsers)
router.get('/usuarios:/id', getUserById)
router.post('/usuarios', createUser)
router.patch('/usuarios/:id', updateUser)
router.delete('/usuarios/:id', deleteUsers)

export default router


