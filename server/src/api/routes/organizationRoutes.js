const express = require('express');
const router = express.Router();
const OrganizationService = require('../../application/organizationService');

// Get /api/organizations
router.get('/', async (req, res) => {
    const orgs = await OrganizationService.getAllOrganizations();

    res.json(orgs);
});

// Get /api/organizations/:id
router.get('/:id', async (req, res) => {
    const org = await OrganizationService.getOrganizationById(req.params.id);

    if (org) {
        res.json(org);
    } else {
        res.status(404).json({error: 'organization not found'});
    }
});

// Post /api/organizations
router.post('/', async (req, res) => {
    const newOrg = await OrganizationService.createOrganization(req.body);

    res.status(201).json(newOrg);
});

// Put /api/organizations/:id
router.put('/:id', async (req, res) => {
    const updatedOrg = await OrganizationService.updateOrganization(req.params.id, req.body);

    res.json(updatedOrg);
});

// Delete /api/organizations/:id
router.delete('/:id', async (req, res) => {
    await OrganizationService.deleteOrganization(req.params.id);

    res.status(204).end();
});

module.exports = router;