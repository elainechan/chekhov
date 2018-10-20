const jwt = require('jsonwebtoken');
const config = require('../config');

exports.verifyToken = (req, res, next) => { // Get token
	const token = req.headers.authorization || req.params.token;

	if (!token) {
    	res.status(401).json({ message: "No token provided" });
    	return;
	}

	jwt.verify(token, config.SECRET, (error, decode) => {
    	if (error) {
        	res.status(500).json({ message: "Token is not valid" });
        	return;
    	}
    	req.user = decode; //userId, email
    	next();
	});
};
