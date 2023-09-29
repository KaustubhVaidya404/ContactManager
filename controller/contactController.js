const asyncHandler = require("express-async-handler");

const getContact = asyncHandler(async (req,res) => {
    res.status(200).json({message:"Get all contacts"});
});

const createContact = asyncHandler(async (req,res)=>{
    console.log("Request body is",req.body);
    const {name, email, phone} =  req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All feilds are mandatory");
    }
    res.status(201).json({message:"Create contact"});
});

const getSpecific = asyncHandler(async (req,res)=>{
    res.status(200).json({message:`Get specific contact ${req.params.id}`});
});

const updateContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message:`Update contact for ${req.params.id}`});
});

const deleteContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message:`Delete contact for ${req.params.id}`});
});

module.exports = {getContact, createContact, getSpecific, updateContact, deleteContact}