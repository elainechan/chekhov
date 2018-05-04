const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
	// find user by email
	User.findOne({ email:req.body.email })
		.then((existingUser) => {
			// check if user exists
			if (existingUser) {
				res.status(310).json({
					message: 'User already exists.'
				});
				return;
			}
			// user does not exist
			let newUser = new User();
			newUser.email = req.body.email;
			// TODO: fill in rest of user properties (password)
			// Encrypt password
			bcrypt.hash(req.body.password, 10)
				.then(encryptedPassword => {
					newUser.password = encryptedPassword;
					// save user in database
					newUser.save() // mongoose save
						.then(user => {
							res.status(201).json({
								message: 'The user is registered.',
								data: user
							})
						})
						.catch((err) => {
							res.status(500).json({
								message: 'Something happened while saving user.',
								data: err
							});
						})
				})
				.catch((err) => {
					res.status(500).json({
						message: 'Something happened while encrypting password.',
						data: err
					});
				})
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Something happened while fetching user.',
				data: err
			});
		})
}
exports.login = (req, res) => {
	// find user by email
	User.findOne({ email:req.body.email })
		.then((existingUser) => {
			// check if user exists
			if (!existingUser) {
				res.status(404).json({
					message: 'User not found.'
				});
				return; // exit point
			}
			// user exists; check password
			let passwordMatches = bcrypt.compareSync(req.body.password, existingUser.password); // returns True or False
			if (!passwordMatches) {
				res.status(401).json({
					message: 'Password does not match.'
				});
				return; // exit point
			}
			// user exists; password matches
			// create token (encrypted object)
			let userToken = { // password is never included
				userId: existingUser._id,
				email: existingUser.email
			}
			// generate token
			let token = jwt.sign(userToken, 'userSecret');
			res.status(201).json({
				message: 'Token has been generated.',
				data: {
					token: token,
					email: existingUser.email,
					userId: existingUser._id
				}
			});
			// this is the point where user is finally logged in
			// user logged in == user has a token
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Something happened while fetching user.',
				data: err
			});
		});
}