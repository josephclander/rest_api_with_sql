const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');

router.get(
  '/',
  authenticateUser,
  asyncHandler(async (req, res) => {
    // find the currentUser again so we can filter the password
    const user = await User.findOne({
      where: { emailAddress: req.currentUser.emailAddress },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    res.json(user);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.location('/').status(201).end();
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
        // extra credit unique error for email
      } else if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: error.message });
      } else {
        throw error;
      }
    }
  })
);

module.exports = router;
