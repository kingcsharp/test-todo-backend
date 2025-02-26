exports.up = async function (knex) {
    await knex.schema.createTable('organizations', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true, true);
    });

    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.integer('organizationId').unsigned().notNullable()  // Fixed typo
            .references('id').inTable('organizations')  // Correct foreign key syntax
            .onDelete('CASCADE'); // Deletes users when the organization is deleted
        table.timestamps(true, true);
    });

    await knex.schema.createTable('projects', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('organizationId').unsigned().notNullable()
            .references('id').inTable('organizations') // Correct foreign key syntax
            .onDelete('CASCADE'); // Deletes projects when the organization is deleted
        table.timestamps(true, true);
    });

    await knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description');

        table.integer('projectId').unsigned().notNullable()
            .references('id').inTable('projects')  // Foreign key for projects
            .onDelete('CASCADE'); // Delete tasks when the project is deleted

        table.integer('userId').unsigned().nullable()
            .references('id').inTable('users')  // Foreign key for users
            .onDelete('SET NULL'); // Set userId to NULL when user is deleted

        table.enu('status', ['pending', 'in-progress', 'completed']).defaultTo('pending');

        table.timestamps(true, true); // Automatically adds created_at and updated_at
    });
};

exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists('organizations')
        .dropTableIfExists('users')
        .dropTableIfExists('projects')
        .dropTableIfExists('tasks');
};
