import express from 'express';
import {createBorrow, createBorrowBook, getBorrowInfoByMember, clearBorrowInfo, returningBooks} from '../domain/controllers/borrowController.js'

const route = express.Router();

/** Access the borrow api implementations on controllers */

 /** POST Methods */
    /**
     * @openapi
     * '/api/borrows/create':
     *  post:
     *     tags:
     *     - Borrow Controller
     *     summary: Create a borrow transaction
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - member
     *              - borrowDate
     *              - dueDate
     *              - isReturned
     *            properties:
     *              member:
     *                type: string
     *                default: M001 
     *              borrowDate:
     *                type: date
     *                default: 2024-06-22T04:24:10.853Z
     *              dueDate:
     *                type: date
     *                default: 2024-06-29T04:24:10.853Z
     *              isReturned:
     *                type: boolean
     *                default: false    
     *     responses:
     *      200:
     *        description: Created and return a new borrow object
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
route.post("/create", createBorrow);

/** POST Methods */
    /**
     * @openapi
     * '/api/borrows/createBorrowBook/{borrowId}':
     *  post:
     *     tags:
     *     - Borrow Controller
     *     summary: Create a borrow detail transaction  
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - book
     *            properties:
     *              book:
     *                type: string
     *                default: JK-45   
     *     responses:
     *      200:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
route.post("/createBorrowBook/:borrowId", createBorrowBook);

/** GET Methods */
    /**
     * @openapi
     * '/api/borrows/getBorrowBook':
     *  get:
     *     tags:
     *     - Borrow Controller
     *     summary: Get list of books that member borrowed
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - member
     *            properties:
     *              member:
     *                type: string
     *                default: M001  
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
route.get("/getBorrowBook", getBorrowInfoByMember);
route.delete("/clearTransactionDetail/:borrowId", clearBorrowInfo);

/** POST Methods */
    /**
     * @openapi
     * '/api/borrows/returningBooks/{borrowId}':
     *  post:
     *     tags:
     *     - Borrow Controller
     *     summary: Returning the books are borrowed, updating borrow status, stock and check whether the member are penalized or not  
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - member
     *            properties:
     *              member:
     *                type: string
     *                default: M001   
     *     responses:
     *      200:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
route.post("/returningBooks/:borrowId", returningBooks);
export default route;