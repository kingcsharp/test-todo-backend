const knex = require('../infrastructure/db/knex');
const Organization = require('../domain/Organization');

class OrganizationService {
    static async getAllOrganizations() {
        const orgs = await knex('organizations');

        return orgs.map(u => new Organization(u));
    }

    static async getOrganizationById(id) {
        const org = await knex('organizations').where({id}).first();

        return org ? new Organization(org) : null;
    }

    static async createOrganization(data) {
        const [id] = await knex('organizations').insert(data).returning('id');
        return await this.getOrganizationById(id);
    }

    static async updateOrganization(id, data) {
        await knex('organizations').where({id}).update(data);

        return await this.getOrganizationById(id);
    }

    static async deleteOrganization(id) {
        return await knex('organizations').where({id}).del();
    }
}

module.exports = OrganizationService;