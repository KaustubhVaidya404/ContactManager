const express = require("express");
const router = express.Router();
const {getContact, createContact, getSpecific, updateContact, deleteContact} = require('../controller/contactController')

router.route('/').get(getContact).post(createContact);

router.route('/:id').get(getSpecific).put(updateContact).delete(deleteContact);

module.exports = router;
