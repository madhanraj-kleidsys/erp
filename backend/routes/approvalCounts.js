const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');

const approvalCount = async (req, res) => {
    try {
        const inpQuery = `
        select distinct AdmTransactionsCode, count(*) as Count_AdmTrans from WFWorkflowInbox where IsActive = 1
group by AdmTransactionsCode
`;

        const results = await sequelize.query(inpQuery, { type: QueryTypes.SELECT, raw: true });
        const totalCount = results.reduce((sum, item) => sum + item.Count_AdmTrans, 0);

        return res.status(200).json({
            success: true,
            message: 'approval codes & counts retrived success',
            // data:results,
            totalCount: totalCount,
            codes: results.map(item => item.AdmTransactionsCode),
            count: results.map(item => item.Count_AdmTrans),
        });

    }
    catch (err) {
        console.error('db error');
        return res.status(500).json({
            success: false,
            message: 'Error fetching sales order data',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }

        })

    }
}

module.exports = approvalCount;

// select distinct AdmTransactionsCode, count(*) as Count_AdmTrans from WFWorkflowInbox where IsActive = 1
// group by AdmTransactionsCode

// select * from  WFWorkflowInbox where IsActive = 1 and AdmTransactionsCode = 'SALESOREDR2';
// -- select * from [dbo].[WFWorkflowInbox];

