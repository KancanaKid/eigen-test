/**
 * Implements the request for borrow api requirements
 * 
 */
import BorrowModel from "../models/borrowModel.js";
import BorrowBooksModel from "../models/borrowBooksModel.js";
import BookModel from "../models/bookModel.js";
import MemberModel from "../models/memberModel.js";
import date from 'date-and-time';

export const createBorrow = async(req, res) => {
    try {
        
        // find the member by member code
        const member = await MemberModel.findOne({code : req.body.member}).exec();
        
        // check if the user has penalize
        if(member.isPenalized){
            return res.status(400).json({message : "Member has penalize"});
        }

        let now = new Date();
        const newBorrow = new BorrowModel({
            member : member._id,
            borrowDate: now,
            dueDate : date.addDays(now, 7),
            isReturned : false
        });
        const isBorrowSave = await newBorrow.save();
        res.status(200).json(isBorrowSave);
    } catch (error) {
        res.status(500).json({"error" : `Internal server error ${error}`});
    }
}

export const createBorrowBook = async(req, res) => {
    try {
        const book = await BookModel.findOne({code : req.body.book}).exec();
        if(book.stock === 0){
            return res.status(400).json({message : "Book(s) are not available"});
        }

        // check if the user has reached maximum borrow
        const numberOfMemberBorrow = await BorrowBooksModel.find({borrow : req.params.borrowId}).populate("book");
        if(numberOfMemberBorrow.length > 1){
            return res.status(400).json({message : "Member has reached maximum borrowing"});
        }

        //const borrow = await BorrowModel.findOne({_id : req.params.borrowId}).exec();
        const newBorrowBook = new BorrowBooksModel({
            borrow : req.params.borrowId,
            book:book._id
        });

        const isBorrowBookSave = await newBorrowBook.save();
        if(isBorrowBookSave){
            const filter = {title : book.title};
            const update = {stock : book.stock -1} ;
            const updateBook = await BookModel.findOneAndUpdate(filter, update);
            if(updateBook){
                res.status(200).json(isBorrowBookSave);
            }
        }
    } catch (error) {
        res.status(500).json({"error" : `Internal server error ${error}`});
    }
}

export const getBorrowInfoByMember = async(req, res) => {
    try {
        const member = await MemberModel.findOne({code : req.body.member}).exec();
        const borrow = await BorrowModel.findOne({member : member._id}).populate("member").exec();
        if(borrow){
            await BorrowBooksModel.find({borrow : borrow._id}).populate("book").then(borrowBooks => {
                res.status(200).json(borrowBooks);
            });
        }else{
            res.status(404).json({message : "Data not found"});
        }
        
    } catch (error) {
        res.status(500).json({"error" : `Internal server error ${error}`});
    }
}

export const clearBorrowInfo = async(req, res) =>{
    try {
        const borrowId = req.params.borrowId;
        const query = {borrow : borrowId};
        const deleteBorrowBooks = await BorrowBooksModel.deleteMany(query);
        if(deleteBorrowBooks){
            res.status(200).json({message : "Transaction detail deleted"});
        }
    } catch (error) {
        res.status(500).json({"error" : `Internal server error ${error}`});
    }
}

export const returningBooks = async(req, res) => {
    try {
        // find the member by member code
        const member = await MemberModel.findOne({code : req.body.member}).exec();

        // find the borrow data
        const borrow = await BorrowModel.findOne({member : member._id, isReturned : false});

        // set returning status
        await BorrowModel.findOneAndUpdate({_id : borrow._id},{isReturned : true});

        // set book stock
        const books = await BorrowBooksModel.find({borrow : borrow._id}).populate("book");
        books.forEach( (book) => {
            BookModel.findOneAndUpdate({code : book.code},{stock : book.stock + 1});
        });

        const returningDate = new Date();

        // check difference due date and returning date
        const differenceDate = date.subtract(returningDate, borrow.dueDate).toDays();
        if(differenceDate > 7){
            // set the member to penalize
            await MemberModel.findOneAndUpdate({_id : member._id},{isPenalized : true});
            const penalizedDays = date.addDays(returningDate, 3);
            res.status(200).json({message : `Book(s) have been returned, but you cannot borrow books until ${penalizedDays}`});
        }else{
            res.status(200).json({message : `Book(s) have been returned`});
        }

    } catch (error) {
        res.status(500).json({"error" : `Internal server error ${error}`});
    }
}
