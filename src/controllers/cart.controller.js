const cartService = require('../service/cart.service');

module.exports = {
    getUserCart: async (req, res) => {
        try {
            const { user: { userId } } = req;
            const cart = await cartService.getUserCart(userId);
            return res.status(200).json({ data: cart });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }

    },
    addItemInCart: async (req, res) => {
        try {
            const { user: { userId }, body } = req;
            const cart = await cartService.addItemInCart(body, userId);
            return res.status(200).json({ data: cart });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }

    },
    updateItemToCart: async (req, res) => {
        try {
            const { user: { id: userId }, body } = req;
            const cart = await cartService.updateItemToCart(body, userId);
            return res.status(200).json({ data: cart });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    deleteItemFromCart: async (req, res) => {
        try {
            const { user: { userId }, params: { cartId } } = req;
            await cartService.deleteItemFromCart(cartId, userId);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    }
} 
