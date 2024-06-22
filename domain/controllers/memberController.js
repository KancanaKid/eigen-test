/**
 * Implements the request for member api requirements
 * 
 */
import Member from '../models/memberModel.js';

export const create = async(req, res) => {
    try {
        const newMember = new Member(req.body);
        const isMemberExist = await Member.findOne({code : req.body.code});

        if(isMemberExist){
            return res.status(400).json({message : "The member are already exist"});
        }
        const isMemberSave = await newMember.save();
        res.status(200).json(isMemberSave);
    } catch (error) {
        res.status(500).json({"error" : `Internal server error ${error}`});
    }
}

export const getMembers = async(req, res) => {
    try {
        const members = await Member.find();
        if(members.length > 0){
            res.status(200).json(members);
        }else{
            res.status(200).json({message : 'No member(s) found'});
        }
    } catch (error) {
        res.status(500).json({"error" : `Internal server error ${error}`});
    }
}