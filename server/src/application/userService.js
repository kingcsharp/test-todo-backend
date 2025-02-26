const knex = require('../infrastructure/db/knex');
const User = require('../domain/User');

class UserService {
    static async getAllUsers() {
        const users = await knex('users');

        return users.map(u => new User(u));
    }

    static async getUserById(id) {
        const user = await knex('users').where({id}).first();

        return user ? new User(user) : null;
    }

    static async createUser(data) {
        const [id] = await knex('users').insert(data).returning('id');
        return await this.getUserById(id);
    }

    static async updateUser(id, data) {
        await knex('users').where({id}).update(data);

        return await this.getUserById(id);
    }

    static async deleteUser(id) {
        return await knex('users').where({id}).del();
    }
}

module.exports = UserService;