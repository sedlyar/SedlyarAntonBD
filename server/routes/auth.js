const express = require('express');
const router = express.Router();
const DB = require('../db/index');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config");

router.post('/sign-in', async (req, res, next) => {
    passport.authenticate('local', async (err, user) => {
        if (user == false) {
            res.status(401).end();
        } else {
            const payload = {
                id: user.id
            };
            const token = jwt.sign(payload, config.jwtSecret);
            res.json({
                ...payload,
                ...user,
                token: `Bearer ${token}`
            });
        }
    })(req, res, next);
});

module.exports = router;