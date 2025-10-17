// const sequelize = require('../../config/db');
// const { QueryTypes } = require('sequelize');

// const dummyApi = async (req, res) => {
//     try {

//         const buyStylq = `
//   SELECT DISTINCT Buyer, StyleCode
//   FROM VuDashBoardData
//   WHERE Buyer = :buyerName
// `;

//         const buyerName = "MAX HOLDINGS - INVESTMENTS LTD";

//         const result = await sequelize.query(buyStylq, {
//             replacements: { buyerName },
//             type: QueryTypes.SELECT,
//             raw: true
//         });

//         const query = `SELECT DISTINCT StyleCode FROM VuDashBoardData`;
//         const Buyerquery = `SELECT DISTINCT Buyer FROM VuDashBoardData`;


//         const StyleCode = await sequelize.query(query, {
//             type: QueryTypes.SELECT, raw: true
//         });

//         const Buyer = await sequelize.query(Buyerquery, {
//             type: QueryTypes.SELECT, raw: true
//         });

//         const buyStyl = await sequelize.query(buyStylq, {
//             type: QueryTypes.SELECT, raw: true
//         });



//         return res.status(200).json({
//            op:result, success: true, buyStyl: buyStyl, StyleCode: StyleCode
//             // ,buyernames:Buyer
//         })
//     } catch (err) {
//         console.error('db error');
//         return res.status(500).json({
//             success: false,
//             message: 'Error fetching sales order data',
//             error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
//         })
//     }
// };
// module.exports = dummyApi;

const sequelize = require('../../config/db');
const { QueryTypes } = require('sequelize');

const getBuyerStyles = async (req, res) => {
  try {
    const buyer = req.query.Buyer;

    if (!buyer) {
      return res.status(400).json({
        success: false,
        message: "Missing required query parameter: Buyer",
      });
    }

    const query = `
      SELECT DISTINCT Buyer, StyleCode
      FROM VuDashBoardData
      WHERE Buyer = :buyer
    `;

    const result = await sequelize.query(query, {
      replacements: { buyer },
      type: QueryTypes.SELECT,
      raw: true
    });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching buyer styles',
      error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
    });
  }
};

module.exports = getBuyerStyles;
