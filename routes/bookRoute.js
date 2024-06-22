import express from 'express';
import { create, getAvailableBooks, getBooks } from '../domain/controllers/bookController.js';

const router = express.Router();

/** Access the books api implementations on controllers */
router.post("/create", create);
router.get("/availableBook", getAvailableBooks);
router.get("/getBooks", getBooks);

export default router;

