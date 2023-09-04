const jwtmod = require('jsonwebtoken');

module.exports = 
    async(req, res, next) => { 
        const bearerHeader = req.headers.authorization; 
        const token = bearerHeader && bearerHeader.split(" ")[1];

        if (token === null) { 
            return res.sendStatus(401);        
        }
        console.log(token, 'token');
    }
