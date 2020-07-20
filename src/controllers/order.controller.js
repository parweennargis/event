const orderService = require('../service/order.service');
const validateOrder = require('../validateRequest/order');
module.exports = {
    placeOrder: async (req, res) => {
        try {
            const { user, body } = req;
            const { isSameAsBilling } = body;

            if (!isSameAsBilling) validateOrder.order(body.billing);
            
            const order = await orderService.placeOrder(user, body);

            return res.status(200).json({ data: order });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    }
}