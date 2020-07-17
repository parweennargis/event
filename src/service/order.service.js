const mongoose = require('mongoose');
const cartRepository = require('../repository/cart.repository');
const userRepository = require('../repository/user.repository');
const orderRepository = require('../repository/order.repository');

const CustomError = require('../utils/error');

module.exports = {
    placeOrder: async (user, data) => {
        let newOrder;
        const { userId } = user;
        const { billing = {}, isSameAsBilling } = data;
        const query = { 
            user: mongoose.Types.ObjectId(userId),
            order_status: 'CART'
        }
        try {
            const cartData = await cartRepository.find(query);
            if (!cartData.length) throw new CustomError(400, 'Please add any event to cart');
            const { total_price, total_tax, cartIds } = cartData.reduce((prev, curr) => {
                prev.total_price += curr.total_price;
                prev.total_tax += curr.tax;
                prev.cartIds.push(curr._id);
                return prev;
            }, { total_price: 0, total_tax: 0, cartIds: [] });

            if (isSameAsBilling) {
                const userData = await userRepository.findOne({ _id: mongoose.Types.ObjectId(userId) });
                billing.first_name = userData.first_name;
                billing.last_name = userData.last_name;
                billing.email = userData.email;
                billing.phone_no = userData.phone_no;
                billing.current_position = userData.current_position;
                billing.address = userData.address;
                billing.city = userData.city;
                billing.province = userData.province;
                billing.postal_code = userData.postal_code;
                billing.country = userData.country;
            }
            
            const order = {
                orders: cartIds,
                total_price,
                total_tax,
                user: userId,
                billing
            };

            newOrder = await orderRepository.create(order);
            await cartRepository.updateMany(query, { order_status: 'ORDER' });
            
            return newOrder;
        } catch (error) {
            console.log(error);
            if (newOrder) {
                await orderRepository.delete({ _id: newOrder._id });
                await cartRepository.updateMany(query, { order_status: 'CART' });
            }
            throw new CustomError(400, error.message || 'Something went wrong!!!');
        }
    }
}