/**
 * @author          Rasmus Jensen
 * @description     Task Model
 * @version         1.0.0
 */

class Task {
    constructor({ id, title, description, projectId, assignedTo, status }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.projectId = projectId;
        this.assignedTo = assignedTo;
        this.status = status;
    }
}

module.exports = Task;