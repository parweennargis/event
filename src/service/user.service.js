const mongoose = require('mongoose');
const User = require('../models/user.model');
const userRepository = require('../repository/user.repository');

module.exports = {
    userList: async (userId) => {
        return userRepository.findOne({ _id: userId });
    },
    findById: async (userId) => {
        const skip = '-password -role -heard_about -reset_password -event_follows -is_active -activate_account';
        // const select  = 'first_name last_name email company_name company_website phone_no address city province postal_code occupation occupation_looking_for total_experience role_type current_position business_type business_description link event_follows license_type license_number license_date_of_expiry driving_record_rating';
        return userRepository.findOne({ _id: userId}, skip);
    },
    updateProfile: async (userId, body) => {
        const skip = '-password -role -heard_about -reset_password -event_follows -is_active -activate_account';
        // const select  = 'first_name last_name email company_name company_website phone_no address city province postal_code occupation occupation_looking_for total_experience role_type current_position business_type business_description';
        return userRepository.findByIdAndUpdate(userId, body, { select: skip });
    }
}
 