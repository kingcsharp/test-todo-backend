const express = require('express');
const router = express.Router();
const ProjectService = require('../../application/projectService');

// Get /api/projects
router.get('/', async (req, res) => {
    const Projects = await ProjectService.getAllProjects();

    res.json(Projects);
});

// Get /api/projects/:id
router.get('/:id', async (req, res) => {
    const project = await ProjectService.getProjectById(req.params.id);

    if (project) {
        res.json(project);
    } else {
        res.status(404).json({error: 'Project not found'});
    }
});

// Post /api/projects
router.post('/', async (req, res) => {
    const newProject = await ProjectService.createProject(req.body);

    res.status(201).json(newProject);
});

// Put /api/projects/:id
router.put('/:id', async (req, res) => {
    const updatedProject = await ProjectService.updateProject(req.params.id, req.body);

    res.json(updatedProject);
});

// Delete /api/projects/:id
router.delete('/:id', async (req, res) => {
    await ProjectService.deleteProject(req.params.id);

    res.status(204).end();
});

module.exports = router;