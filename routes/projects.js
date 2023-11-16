const express = require('express');
const router = express.Router();

const ProjectsController = require('../controllers/projectsController');

router.get('/', ProjectsController.getAllProjects);
router.get('/:id', ProjectsController.getOneProject);
router.post('/', ProjectsController.createProject);
router.delete('/', ProjectsController.deleteProject);

module.exports = router;
