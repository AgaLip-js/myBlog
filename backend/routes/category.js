const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../models/Posts');

router.get('/', (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => {
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

        res.json(groupBy(posts, 'section'))
      })
      .catch(err => res.status(404).json({ nopostsfound: 'No category found' }));
  });

  module.exports = router;