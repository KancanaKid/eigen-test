import express from 'express';
import { create , getMembers} from '../domain/controllers/memberController.js';

const router = express.Router();

/** Access the members api implementations on controllers */
router.post("/create", create);
router.get('/getMembers', getMembers);

export default router;