const Projects = require('../models/Projects');

exports.getAllProjects = (_req, res) => {
  Projects.find()
    .then((projects) => res.status(200).json(projects))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneProject = (req, res) => {
  Projects.findOne({ _id: req.params.id.toString() })
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(404).json({ error }));
};

exports.createProject = (req, res) => {
  const project = new Projects({
    ...req.body,
  });
  project
    .save()
    .then(() => res.status(201).json({ message: 'Project added successfully' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteProject = (req, res) => {
  Projects.deleteOne({ id: req.body.id.toString() })
    .then(() =>
      res.status(200).json({ message: 'Project deleted successfully' })
    )
    .catch((error) => res.status(400).json({ error }));
};
