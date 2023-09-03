const express = require('express');
const router = express.Router(); 

let data = ["USER", "ADMIN"];

const getDocuments = async(req,res) => {    
    try {
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
};

router.get("/", getDocuments);

module.exports = router;
