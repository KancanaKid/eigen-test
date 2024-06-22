import express from 'express';
import { create, getAvailableBooks } from '../domain/controllers/bookController.js';

const router = express.Router();

 /** POST Methods */
    /**
     * @openapi
     * '/api/books/create':
     *  post:
     *     tags:
     *     - Book Controller
     *     summary: Create a book
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - code
     *              - title
     *              - author
     *              - stock
     *            properties:
     *              code:
     *                type: string
     *                default: johndoe 
     *              title:
     *                type: string
     *                default: ESQ
     *              author:
     *                type: string
     *                default: Ari Ginanjar
     *              stock:
     *                type: number
     *                default: 1    
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post("/create", create);

/** GET Methods */
    /**
     * @openapi
     * '/api/books/availableBook':
     *  get:
     *     tags:
     *     - Book Controller
     *     summary: Get a available book to borrow, if the stock is 0 then is will be not showing
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.get("/availableBook", getAvailableBooks);


/* router.get("/getBooks", getBooks); */

export default router;

