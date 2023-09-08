import express from 'express'
import { createtask, gettask,updatetask,deletetask } from '../controllers/task.js';
import { auth } from '../middlewares/auth.js';

const router=express.Router()

router.post('/newtask',auth,createtask)
router.get('/taskdetail',auth,gettask)
router.route('/:id').put(auth,updatetask).delete(auth,deletetask)
export default router;