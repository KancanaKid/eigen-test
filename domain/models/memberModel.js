/**
 * Implements the book schema as per member table structure 
 */
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    code: {
        type : String,
        required:true
    },
    name : {
        type : String,
        required:true
    },
    isPenalized : {
        type:Boolean,
        required : true,
        default:false
    }
});

export default mongoose.model('member', memberSchema);