const LocalStrategy = require('passport-local');
const DB = require('../db/index');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (usersRep) => (
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        async (email, password, done) => {
            console.log(email);
            let user = (await DB.query(`
                SELECT id, email, password FROM users where email = $email;
            `, { email })).rows[0];

            if (!user) {
                return done(null, false, {message: "User with this email hasn't registered"});
            }
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
        }
    )
)