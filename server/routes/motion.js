const express = require('express');
const router = express.Router();
const DB = require('../db/index');
const passport = require("passport");

router.get('/', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
  const select = await DB.query(`
    SELECT car.id, car_brand.brand_name as id_car
    FROM motion 
    LEFT JOIN car on motion.id_car = car.id
    left join car_brand on car.id_car_brand = car_brand.id
  `);

  res.send(select.rows);
});
router.post('/', async function(req, res, next) {
  await DB.query(`
    insert into motion (id_car, id_driver, id_customers,id_dispatcher, money) VALUES ($id_car, $id_driver, $id_customers, $id_dispatcher, $money);
  `, { ...req.body });

  res.end();
});
router.put('/:id', async function(req, res, next) {
  await DB.query(`
    UPDATE motion SET id_car=$id_car, id_driver=$id_driver, id_customers=$id_customers, id_dispatcher=$id_dispatcher, money=$money WHERE id=$id
  `, { ...req.body, id: req.params.id });

  res.end();
});
router.delete('/:id', async function(req, res, next) {
  await DB.query(`
    DELETE from motion WHERE id=$id;
  `, { id: req.params.id });

  res.end();
});

module.exports = router;
