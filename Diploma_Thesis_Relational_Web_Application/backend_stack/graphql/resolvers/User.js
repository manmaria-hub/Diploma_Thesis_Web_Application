const bcrypt = require('bcrypt');
const {UserInputError, AuthenticationError} = require('apollo-server');
const jwt = require('jsonwebtoken');
const {Op} =  require('sequelize')

// JSON WEB TOKENS
const {JWT_SECRET} = require('../../config/env.json');

// MODELS
const { User } = require('../../models'); 
 
const user_resolvers = {
    Query : {
        getUsers : async (_, __, {user}) => {       
               
            try {/*
                let user;
                if (context.req && context.req.headers.authorization) {
                    console.log( context.req.headers.authorization)
                    const token = context.req.headers.authorization.split('Bearer ')[1];
                    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
                        if(err){
                            throw new AuthenticationError('Unauthenticated')
                        }
                        user = decodedToken;  
                    })                    
                }*/
                if (!user) throw new AuthenticationError('Unauthenticated!')
                // Get all te useers but not 
                const users = await User.findAll({
                    where: {username : {[Op.ne]: user.username}}
                }) 
                return users
            } catch (err) {
                console.log(err)
                throw err;
            }
        },
        login : async(_, args) => {
            const {username, password} = args;
            let errors = {}

            try {
                if (username.trim() === '') errors.username = 'Username must not be empty!';
                if (password === '') errors.password = 'Password must not be empty!';
                
                if (Object.keys(errors).length > 0) {
                    throw new UserInputError('Bad input!', {errors})
                }
                const user = await User.findOne({
                    logging : console.log,
                    
                    where : {username}
                })
                if (!user) {
                    errors.username = 'Ο συγκεκριμένος χρήστης δε βρέθηκε!'                    
                }
                if (Object.keys(errors).length > 0) {
                    throw new UserInputError('Ο συγκεκριμένος χρήστης δε βρέθηκε!', {errors})
                }

                const correctPassword = await bcrypt.compare(password, user.password);
                if (!correctPassword) {
                    errors.password = 'Ο κωδικός είναι λανθασμένος!';
                    throw new AuthenticationError('Ο κωδικός είναι λανθασμένος!', {errors})
                }
                

                const token = jwt.sign({
                    username
                }, JWT_SECRET , {expiresIn: 60*60})

                user.token = token;
                return {
                    ...user.toJSON(),
                    createdAt: user.createdAt.toISOString(),
                    token
                };
            }
            catch(err) {
                console.log(err)
                throw err;
            }
        }
    },
    Mutation : {
        register : async(_, args) => {
            let {first_name, last_name, username, email, role, password, confirm} = args;
            let errors = {}

            try {
                // Validate input data
                if (email.trim() === '') {errors.email = 'Email must not be empty'}
                if (username.trim() === '') {errors.email = 'Username must not be empty'}
                if (password.trim() === '') {errors.email = 'Password must not be empty'}
                if (confirm.trim() === '') {errors.email = 'Confirm Password must not be empty'}

                if(password !== confirm) {errors.confirm = 'Password must match'}
                // Check if username/email exists
                const userByUserName = await User.findOne({where : {username}})
                const userByEmail = await User.findOne({where : {email}})
                
                // DUPLICATE USERNAMES
                //if (userByUserName) errors.username = 'Username is taken!'
                //if (userByEmail) errors.email = 'Email is taken!'

                if (Object.keys(errors).length > 0 ){
                    throw errors;
                }
                // Hash password
                password = await bcrypt.hash(password, 12);
                // Create user
                const user = await User.create({
                    first_name, last_name, username, email, role, password, confirm
                })
                // Return user
                return user

            } catch(err) {
                console.log(err)
                if (err.name === 'SequelizeUniqueConstraintError') {
                    err.errors.forEach(e=> (errors[e.path] = `${e.path} is already taken!`))
                }
                else if (err.name === 'SequelizeValidationError') {
                    err.errors.forEach(e=>errors[e.path] = e.message)
                }
                throw new UserInputError('Bad input', {errors})
            }
        }
    }
}

module.exports = user_resolvers;