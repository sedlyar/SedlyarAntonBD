const express = require('express');
const router = express.Router();
const DB = require('../db/index');
const passport = require("passport");

router.get('/', passport.authenticate('jwt', {session: false}), async function(req, res, next) {
  const select = await DB.query(`
    SELECT *
    FROM customers 
  `);

  res.send(select.rows);
});
router.post('/', async function(req, res, next) {
  await DB.query(`
    insert into customers (ful_name, id_streets, house_number, apartment_number, phone_number) VALUES ($ful_name, $id_streets, $house_number, $apartment_number, $phone_number);
  `, { ...req.body });

  res.end();
});
router.put('/:id', async function(req, res, next) {
  await DB.query(`
    UPDATE customers SET 
    ful_name=$ful_name, 
    id_streets=$id_streets, 
    house_number=$house_number, 
    apartment_number=$apartment_number
    WHERE id=$id
  `, { ...req.body, id: req.params.id });

  res.end();
});
router.delete('/:id', async function(req, res, next) {
  await DB.query(`
    DELETE from customers WHERE id=$id;
  `, { id: req.params.id });

  res.end();
});

module.exports = router;
