const express = require('express');
const router = express.Router();
const sequelize = require('../../config/db');
const { QueryTypes } = require('sequelize');


router.get('/state/:state', async (req, res) => {
    try {
        const state = req.params.state;
        const query = `SELECT PostOfficeName, Pincode, City, District, State
            FROM pincode
            WHERE State = :state`;

        const stt = await sequelize.query(query, {
            replacements: { state },
            type: QueryTypes.SELECT,
            raw: true
        });
        return res.status(200).json({
            success: true,
            data: stt
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.get('/pincode/:PostalCode', async (req, res) => {
    try {
        const PostalCode = req.params.PostalCode;

        const query = `SELECT PostOfficeName, City, District, State
            FROM pincode
            WHERE Pincode = :PostalCode`;

        const pin = await sequelize.query(query, {
            replacements: { PostalCode },
            type: QueryTypes.SELECT,
            raw: true
        });
        return res.status(200).json({ success: true, data: pin });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching cities',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        });
    }
});

module.exports = router;