const express = require('express');
const router = express.Router();
const DB = require('../db/index');
const passport = require("passport");

router.get('/', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
  const select = await DB.query(`
    SELECT *
    FROM car_brand 
  `);

  res.send(select.rows);
});
router.post('/', async function(req, res, next) {
  await DB.query(`
    insert into car_brand (brand_name) VALUES ($brand_name);
  `, { ...req.body });

  res.end();
});
router.put('/:id', async function(req, res, next) {
  await DB.query(`
    UPDATE car_brand SET brand_name=$brand_name WHERE id=$id
  `, { ...req.body, id: req.params.id });

  res.end();
});
router.delete('/:id', async function(req, res, next) {
  await DB.query(`
    DELETE from car_brand WHERE id=$id;
  `, { id: req.params.id });

  res.end();
});

module.exports = router;
