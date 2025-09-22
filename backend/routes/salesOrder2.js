const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');

const salesOrder2 = async (req, res) => {
    try {
        const query = ` select * from  WFWorkflowInbox where IsActive = 1 and AdmTransactionsCode = 'SALESOREDR2' `;

        const op = await sequelize.query(query, {
            type: QueryTypes.SELECT, raw: true
        });

        return res.status(200).json({
            success: true,
            data: op
        })

    } catch (err) {
        console.error('db eror');
        return res.status(500).json({
            success: false,
            message: 'Error fetching sales order data',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        })
    }

};

const SERVINVOICE = async (req, res) => {
    try {
        const query = ` select * from  WFWorkflowInbox where IsActive = 1 and AdmTransactionsCode = 'SERVINVOICE' `;

        const op = await sequelize.query(query, {
            typr: QueryTypes.SELECT, raw: true
        });

        return res.status(200).json({
            success: true,
            data: op
        })

    } catch (err) {
        console.error('db eror');
        return res.status(500).json({
            success: false,
            message: 'Error fetching sales order data',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        })
    }

}

const STKRECPNOTE = async (req, res) => {
    try {
        const query = ` select * from  WFWorkflowInbox where IsActive = 1 and AdmTransactionsCode = 'STKRECPNOTE' `;

        const op = await sequelize.query(query, {
            typr: QueryTypes.SELECT, raw: true
        });

        return res.status(200).json({
            success: true,
            data: op
        })

    } catch (err) {
        console.error('db eror');
        return res.status(500).json({
            success: false,
            message: 'Error fetching sales order data',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        })
    }

}

const VENDORBILL = async (req, res) => {
    try {
        const query = ` select * from  WFWorkflowInbox where IsActive = 1 and AdmTransactionsCode = 'VENDORBILL' `;

        const op = await sequelize.query(query, {
            typr: QueryTypes.SELECT, raw: true
        });

        return res.status(200).json({
            success: true,
            data: op
        })

    } catch (err) {
        console.error('db eror');
        return res.status(500).json({
            success: false,
            message: 'Error fetching sales order data',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        })
    }

}

const STYLEJOBWORK = async (req, res) => {
    try {
        const query = ` select * from  WFWorkflowInbox where IsActive = 1 and AdmTransactionsCode = 'STYLEJOBWORK' `;

        const op = await sequelize.query(query, {
            typr: QueryTypes.SELECT, raw: true
        });

        return res.status(200).json({
            success: true,
            data: op
        })

    } catch (err) {
        console.error('db eror');
        return res.status(500).json({
            success: false,
            message: 'Error fetching sales order data',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        })
    }

}

const PROCUREORDER = async (req, res) => {
    try {
        const query = ` select * from  WFWorkflowInbox where IsActive = 1 and AdmTransactionsCode = 'PROCUREORDER' `;

        const op = await sequelize.query(query, {
            typr: QueryTypes.SELECT, raw: true
        });

        return res.status(200).json({
            success: true,
            data: op
        })

    } catch (err) {
        console.error('db eror');
        return res.status(500).json({
            success: false,
            message: 'Error fetching sales order data',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        })
    }

}


const STKREQUESTNOTE = async (req, res) => {
    try {
        const query = ` select * from  WFWorkflowInbox where IsActive = 1 and AdmTransactionsCode = 'STKREQUESTNOTE' `;

        const op = await sequelize.query(query, {
            typr: QueryTypes.SELECT, raw: true
        });

        return res.status(200).json({
            success: true,
            data: op
        })

    } catch (err) {
        console.error('db eror');
        return res.status(500).json({
            success: false,
            message: 'Error fetching sales order data',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        })
    }

}

module.exports = { salesOrder2, SERVINVOICE, VENDORBILL, STKRECPNOTE, STYLEJOBWORK, PROCUREORDER, STKREQUESTNOTE };