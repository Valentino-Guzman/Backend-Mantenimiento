import { Router } from "express";
import { getWorkOrder } from "../controllers/work_order.controller";

const router = Router()

router.get('/ordenes', getWorkOrder)
router.get('/ordenes/:id', getWorkOrderByid)
router.post('/ordenes', addWorkOrder)
router.put('/ordenes', updateWorkOrder)
router.delete('/ordenes', deleteWorkOrder)
