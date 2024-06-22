/**
 * Implements the book schema as per book table structure 
 */
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    code : {
        type : String,
        required:true
    },
    title: {
        type : String,
        required:true
    },
    author : {
        type : String,
        required:true
    },
    stock : {
        type : Number,
        required:true
    }
});

export default mongoose.model('book', bookSchema);