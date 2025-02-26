/**
 * @author          Rasmus Jensen
 * @description     User Model
 * @version         1.0.0
 */

class User {
    constructor({ id, name, email, organizationId }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.organizationId = organizationId;
    }
}

module.exports = User;