/**
 * @author          Rasmus Jensen
 * @description     Project Model
 * @version         1.0.0
 */

class Project {
    constructor({ id, name, organizationId }) {
        this.id = id;
        this.name = name;
        this.organizationId = organizationId;
    }
}

module.exports = Project;