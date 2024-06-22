/**
 * Implements the book schema as per borrow detail table structure 
 */
import mongoose, { Schema } from "mongoose";

const borrowBooksSchema = new mongoose.Schema({
    borrow : {
        type : Schema.Types.ObjectId,
        ref : 'borrow',
        required : true
    },
    book : {
        type : Schema.Types.ObjectId,
        ref : 'book',
        required : true
    }
});

export default mongoose.model('borrowBook', borrowBooksSchema);