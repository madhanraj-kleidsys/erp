const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');
const express = require('express');
const router = express.Router();

router.get('/productionStatus', async (req, res) => {
    try {
        const query = `select ID as DyingCount , VBID as SewingCount ,floor(ChargesAmount) as TestingCount , floor(TotalValue) as RejectedCount from [ProcVendorBillCharges] where ID =515
`;

        const op = await sequelize.query(query, {
            type: QueryTypes.SELECT, raw: true
        });
        return res.status(200).json({
            success: true, data: op
        });
    }
    catch (err) {
        console.log("db error");
        return res.status(500).json({
            success: false,
            message: 'Error fetching sales order data',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        })

    }
}
)
module.exports = router;