import { Router} from "express";
import { getUsers, getUsersById, deleteUser } from "../controllers/user.controller.js";

const router = Router()

router.get('/usuarios', getUsers)
router.get('/usuarios/:id', getUsersById)
router.delete('/usuarios/:id', deleteUser)

export default router