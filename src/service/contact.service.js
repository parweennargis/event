const contactRepository = require('../repository/contact.repository');
const subscriptionRepository = require('../repository/subscription.repository');

module.exports = {
    createContact: async (body) => {
        return await contactRepository.create(body);
    },
    subscribeNewsletter: async (body) => {
        return await subscriptionRepository.create(body);
    }
}
