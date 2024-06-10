const jwt = require('jsonwebtoken');
const localStorage = require('node-localstorage').LocalStorage;

const authenticate = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "secret");
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message: "Auth failed" + err
        });
    }
}

module.exports = authenticate;