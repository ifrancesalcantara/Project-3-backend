const express = require('express');
const router = express.Router();
const Paintings = require("../models/painting")
const User = require("../models/user")


router.post('/', function(req, res, next) {
  const { creator } = req.body
  Paintings.create( req.body )
  .then( (newPainting) => {
    res.status(202).json(newPainting)
    User.findByIdAndUpdate( creator, 
      {$push: {paintings: newPainting._id}},
      {new: true})
      .populate("paintings")
      .then(updatedUser=>{ console.log(updatedUser) })
      .catch(err=>console.log(err))
      return;
    })
    .catch( (err) => {
      res.status()
      console.log(err)});
    });
    
    router.get('/', function(req, res, next) {
      Paintings.find()
      .then( allPaintings => {
        res.status(202).json(allPaintings)
        return;
      })
      .catch( (err) => {
        res.status()
        console.log(err)});
      });
      
      router.get('/home', function(req, res, next) {
        Paintings.find({})
          .then( allPaintings => {
            //!!!
            const notOwnPaintings = allPaintings.filter(painting=>
              {
                if(painting.creator!="5deb63889997fe333e0be6d0") {
                  return true;
                }
              }
            )
            res.status(202).json(notOwnPaintings)
            return;
          })
          .catch( (err) => {
            res.status()
            console.log("THERE WAS AN ERROR IN FIND BACKEND")
            console.log(err)});
      });

      router.get('/:paintingId', function(req, res, next) {
        const { paintingId } = req.params
        Paintings.findById(paintingId)
        .then( painting => {
          res.status(202).json(painting)
          return;
    })
    .catch( (err) => {
      res.status()
      console.log(err)});
});

router.get('/user/:userId', function(req, res, next) {
  User.findById(req.params.userId)
    .populate("paintings")
    .then( user => {
      res.status(202).json(user.paintings)
      return;
    })
    .catch( (err) => {
      res.status()
      console.log(err)});
});


module.exports = router;
