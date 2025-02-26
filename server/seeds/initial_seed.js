exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('tasks').del();
    await knex('projects').del();
    await knex('users').del();
    await knex('organizations').del();

    // Insert seed entries for 'organizations'
    const [org1, org2] = await knex('organizations').insert([
        { name: 'Tech Corp' },
        { name: 'Design Studio' }
    ], ['id']);  // Capture the generated organization IDs

    // Insert seed entries for 'users'
    const [user1, user2, user3] = await knex('users').insert([
        { name: 'John Doe', email: 'john.doe@example.com', organizationId: org1.id },
        { name: 'Jane Smith', email: 'jane.smith@example.com', organizationId: org1.id },
        { name: 'Alice Johnson', email: 'alice.johnson@example.com', organizationId: org2.id }
    ], ['id']);  // Capture the generated user IDs

    // Insert seed entries for 'projects'
    const [project1, project2] = await knex('projects').insert([
        { name: 'Project Alpha', organizationId: org1.id },
        { name: 'Project Beta', organizationId: org2.id }
    ], ['id']);  // Capture the generated project IDs

    // Insert seed entries for 'tasks'
    await knex('tasks').insert([
        { title: 'Task 1 for Project Alpha', description: 'Setup database', projectId: project1.id, userId: user1.id },
        { title: 'Task 2 for Project Alpha', description: 'Develop API', projectId: project1.id, userId: user2.id },
        { title: 'Task 1 for Project Beta', description: 'Create wireframes', projectId: project2.id, userId: user3.id },
        { title: 'Task 2 for Project Beta', description: 'Design website layout', projectId: project2.id, userId: user3.id }
    ]);
};
