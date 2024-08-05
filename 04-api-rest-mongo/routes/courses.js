const express = require('express');
const Course = require('../models/course_model');
const router = express.Router();

const verifyToken = require('../middlewares/auth');

router.get('/', verifyToken, (req, res) => {
  let result = listActiveCourses();

  result
    .then( courses => res.json(courses) )
    .catch( error => res.status(400).json(error) );
});

router.post('/', verifyToken, (req, res) => {
  let result = createCourse(req.body);

  result
    .then( course => res.json(course) )
    .catch( error => res.status(400).json(error) );
});

router.put('/:id', verifyToken, (req, res) => {
  let result = updateCourse(req.params.id, req.body);

  result
    .then( course => res.json(course) )
    .catch( error => res.status(400).json(error) );
});

router.delete('/:id', verifyToken, (req, res) => {
  let result = deactivateCourse(req.params.id);

  result
    .then( course => res.json(course) )
    .catch( error => res.status(400).json(error) );
});

// Functions

async function listActiveCourses() {
  return await Course.find({ 'state': true });
}

async function createCourse(body) {
  let course = new Course({
    title: body.title,
    description: body.description,
  });

  return await course.save();
}

async function updateCourse(id, body) {
  let course = await Course.findByIdAndUpdate(id, {
    $set: {
      title: body.title,
      description: body.description,
    }
  }, { new: true });

  return course;
}

async function deactivateCourse(id) {
  let course = await Course.findByIdAndDelete(id, {
    $set: {
      state: false
    }
  }, { new: true });

  return course;
}

module.exports = router;
