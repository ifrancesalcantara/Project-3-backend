const express = require('express');
const router = express.Router();
const User = require("../models/user")

/* GET users listing. */
router.post('/', function(req, res, next) {
  const { username } = req.body
  User.create( { username } )
  .then( (newUser) => {
    res.status(202).json(newUser)
    return;
  })
  .catch( (err) => {
    res.status()
    console.log(err)});
});


router.get('/:userId', function(req, res, next) {
  const { userId } = req.params
  User.findById(userId)
  .populate("paintings")
  .then( (user) => {
    console.log(user)
    res.status(202).json(user)
    return;
  })
  .catch( (err) => {
    res.status(500).json(err)
    console.log(err)});
});


router.get('/', function(req, res, next) {
  User.find()
  .then( (allUsers) => {
    res.status(202).json(allUsers)
    return;
  })
  .catch( (err) => {
    res.status(500).json(err)
    console.log(err)});
});

module.exports = router;
