import express from 'express';
import {createBorrow, createBorrowBook, getBorrowInfoByMember, clearBorrowInfo, returningBooks} from '../domain/controllers/borrowController.js'

const route = express.Router();

/** Access the borrow api implementations on controllers */
route.post("/create", createBorrow);
route.post("/createBorrowBook/:borrowId", createBorrowBook);
route.get("/getBorrowBook", getBorrowInfoByMember);
route.delete("/clearTransactionDetail/:borrowId", clearBorrowInfo);
route.post("/returningBooks/:borrowId", returningBooks);
export default route;