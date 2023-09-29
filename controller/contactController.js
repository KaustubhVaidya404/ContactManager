const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { param } = require("../routes/contactRoutes");

const getContact = asyncHandler(async (req,res) => {
    const contacts = await Contact.find(); 
    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req,res)=>{
    console.log("Request body is",req.body);
    const {name, email, phone} =  req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All feilds are mandatory");
    };

    const contact = Contact.create({
        name,
        email,
        phone,
    });

    res.status(201).json(contact);
});

const getSpecific = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updateContact);
});

const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    };

    await Contact.remove();

    res.status(200).json(contact);
});

module.exports = {getContact, createContact, getSpecific, updateContact, deleteContact}