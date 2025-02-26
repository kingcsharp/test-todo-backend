const knex = require('../infrastructure/db/knex');
const Project = require('../domain/Project');

class ProjectService {
    static async getAllProjects() {
        const projects = await knex('projects');

        return projects.map(u => new Project(u));
    }

    static async getProjectById(id) {
        const project = await knex('projects').where({id}).first();

        return project ? new Project(project) : null;
    }

    static async createProject(data) {
        const [id] = await knex('projects').insert(data).returning('id');
        return await this.getProjectById(id);
    }

    static async updateProject(id, data) {
        await knex('projects').where({id}).update(data);

        return await this.getProjectById(id);
    }

    static async deleteProject(id) {
        return await knex('projects').where({id}).del();
    }
}

module.exports = ProjectService;