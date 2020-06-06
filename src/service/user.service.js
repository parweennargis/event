const mongoose = require('mongoose');
const User = require('../models/user.model');
const userRepository = require('../repository/user.repository');

module.exports = {
    userList: async (userId) => {
        return userRepository.findOne({ _id: userId });
    },
    findById: async (userId) => {
        const select  = 'first_name last_name email company_name company_website phone_no address city province postal_code occupation occupation_looking_for total_experience role_type current_position business_type business_description link event_follows';
        return userRepository.findOne({ _id: userId}, select);
    },
    updateProfile: async (userId, body) => {
        const select  = 'first_name last_name email company_name company_website phone_no address city province postal_code occupation occupation_looking_for total_experience role_type current_position business_type business_description';
        return userRepository.findByIdAndUpdate(userId, body, { select });
    }
}
 