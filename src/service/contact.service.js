const contactRepository = require('../repository/contact.repository');

module.exports = {
    createContact: async (body) => {
        return await contactRepository.create(body);
    }
}
