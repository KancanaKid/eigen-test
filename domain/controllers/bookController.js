/**
 * Implements the request for books api requirements
 * 
 */
import Book from '../models/bookModel.js';

export const create = async(req, res) => {
    try {
        const newBook = new Book(req.body);
        const isBookExist = await Book.findOne({code:req.body.code}).exec();

        if(isBookExist){
            return res.status(400).json({message : "The book are already exist"});
        }
        const isBookSave = await newBook.save();
        res.status(200).json(isBookSave);
    } catch (error) {
        res.status(500).json({"error" : `Internal server error ${error}`});
    }
}

/* export const getBooks = async(req, res) => {
    try {
        const books = await Book.find();
        if(books.length > 0){
            res.status(200).json(books);
        }else{
            res.status(200).json({message : 'No available book(s)'});
        }
    } catch (error) {
        res.status(500).json({"error" : `Internal server error ${error}`});
    }
} */

export const getAvailableBooks = async(req, res) => {
    try {
        const availableBooks = await Book.find();
        const filteredBooks = availableBooks.filter((book) => book.stock > 0);
        if(filteredBooks.length > 0){
            res.status(200).json(filteredBooks);
        }else{
            res.status(200).json({message : 'No available book(s)'});
        }
        
    } catch (error) {
        res.status(500).json({"error" : `Internal server error ${error}`});
    }
} 