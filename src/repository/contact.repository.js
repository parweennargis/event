const ContactModel = require('../models/contact.model');

class ContactRepository {
    /**
     * Insert One Record
     * @param {Object} query
     */
    async create(query) {
        return ContactModel.create(query);
    }
}

module.exports = new ContactRepository();
