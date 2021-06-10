const express = require('express');
const router = express.Router();
const { Course, User } = require('../models');
const { asyncHandler } = require('../middleware/async-handler');

// A /api/courses GET route that will return a list of all courses including the User that owns each course and a 200 HTTP status code.
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: User,
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
    });
    res.json(courses);
  })
);

// A /api/courses/:id GET route that will return the corresponding course along with the User that owns that course and a 200 HTTP status code.
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const course = await Course.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: User,
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
    });
    if (course) {
      res.json(course);
    } else {
      res
        .status(404)
        .res.json({ message: `Course ${req.params.id} not found.` });
    }
  })
);

// A /api/courses POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
router.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      // create the course
      const newCourse = await Course.create(req.body);
      res.location(`/api/courses/${newCourse.id}`).status(201).end();
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// A /api/courses/:id PUT route that will update the corresponding course and return a 204 HTTP status code and no content.
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    // get the course
    const course = await Course.findByPk(req.params.id);
    // open course info
    if (course) {
      // save course with added info
      await course.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: `Course ${req.params.id} not found.` });
    }
  })
);

// A /api/courses/:id DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      // delete the selected course
      await course.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: `Course ${req.params.id} not found.` });
    }
  })
);

module.exports = router;
