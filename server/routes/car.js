const express = require('express');
const router = express.Router();
const DB = require('../db/index');
const passport = require("passport");

router.get('/', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
  const select = await DB.query(`
    SELECT *
    FROM car 
  `);

  res.send(select.rows);
});
router.post('/', async function(req, res, next) {
  await DB.query(`
    insert into car (id_car_brand, id_color) VALUES ($id_car_brand, $id_color);
  `, { ...req.body });

  res.end();
});
router.put('/:id', async function(req, res, next) {
  await DB.query(`
    UPDATE car SET name_id_car_brand=$id_car_brand, id_color=$id_color WHERE id=$id
  `, { ...req.body, id: req.params.id });

  res.end();
});
router.delete('/:id', async function(req, res, next) {
  await DB.query(`
    DELETE from car WHERE id=$id;
  `, { id: req.params.id });

  res.end();
});

module.exports = router;
