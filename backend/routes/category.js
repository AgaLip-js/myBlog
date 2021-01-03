const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../models/Posts');

function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push(obj.category);
        return acc;
    }, {
    });
}


router.get('/categories', (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .distinct('category')
      .then(posts => {
        res.json(posts)
      })
      .catch(err => res.status(404).json({ nopostsfound: 'No category found' }));
  });

  router.get('/:section', (req, res) => {
    const selectSection = req.params.section
    console.log(selectSection);
    Post.find()
      .sort({ date: -1 })
      .then(posts => {
        const section = groupBy(posts, 'section');
        res.json(section[selectSection])
      })
      .catch(err => res.status(404).json({ nopostsfound: 'No category found' }));
  });



  module.exports = router;