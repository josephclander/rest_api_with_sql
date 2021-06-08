const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { asyncHandler } = require('../middleware/async-handler');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.json({ message: 'This is the currently authenticated user' });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.location('/').status(201).end();
    } catch (error) {
      throw error;
    }
  })
);

module.exports = router;
