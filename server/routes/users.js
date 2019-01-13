const express = require('express');
const router = express.Router();
const DB = require('../db/index');
const passport = require("passport");

router.get('/', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
  const select = await DB.query(`
    SELECT *
    FROM users
  `);

  res.send(select.rows);
});
router.post('/', async function(req, res, next) {
  await DB.query(`
    insert into users (email, password) VALUES ($email, $password);
  `, { ...req.body });

  res.end();
});
router.put('/:id', async function(req, res, next) {
  await DB.query(`
    UPDATE users SET email=$email, password=$password WHERE id=$id
  `, { ...req.body, id: req.params.id });

  res.end();
});
router.delete('/:id', async function(req, res, next) {
  await DB.query(`
    DELETE from users WHERE id=$id;
  `, { id: req.params.id });

  res.end();
});

module.exports = router;
