const knex = require('../infrastructure/db/knex');
const Task = require('../domain/Task');

class TaskService {
    static async getAllTasks() {
        const tasks = await knex('tasks');

        return tasks.map(u => new Task(u));
    }

    static async getTaskById(id) {
        const task = await knex('tasks').where({id}).first();

        return task ? new Task(task) : null;
    }

    static async createTask(data) {
        const [id] = await knex('tasks').insert(data).returning('id');
        return await this.getTaskById(id);
    }

    static async updateTask(id, data) {
        await knex('tasks').where({id}).update(data);

        return await this.getTaskById(id);
    }

    static async deleteTask(id) {
        return await knex('tasks').where({id}).del();
    }
}

module.exports = TaskService;