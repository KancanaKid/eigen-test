/**
 * Implements the book schema as per borrow table structure 
 */
import mongoose, { Schema } from "mongoose";

const borrowSchema = new mongoose.Schema({
    member : {
        type : Schema.Types.ObjectId,
        ref : 'member',
        required : true
    },
    borrowDate : {
        type : Date,
        required : true,
        default : Date.now()
    },
    dueDate : {
        type : Date,
        required : true
    },
    isReturned : {
        type: Boolean,
        required:true,
        default : false
    }
});

export default mongoose.model('borrow', borrowSchema);