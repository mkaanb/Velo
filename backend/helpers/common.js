const express = require('express');
const validateFields = require('./validateFields');
const supabase = require('../supabaseClient');
const dayjs = require('dayjs');
const buildSupabaseQuery = require('./queryBuilder');

async function getUserId(req) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new Error('Authorization token is missing');
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        throw new Error('Invalid or expired token');
    }

    return user.id;
}

module.exports = {
    express,
    validateFields,
    supabase,
    dayjs,
    getUserId,
    buildSupabaseQuery
};
