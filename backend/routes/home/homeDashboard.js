const sequelize = require('../../config/db');
const { QueryTypes } = require('sequelize');

const homeDashboard = async (req, res) => {
  try {
    // Extract filter params from request body
    const { Buyer, WeekNo, StyleCode } = req.body;

    // Build dynamic WHERE conditions for filtering
    let whereClauses = [];
    let replacements = {};

    if (Buyer) {
      whereClauses.push('Buyer = :Buyer');
      replacements.Buyer = Buyer;
    }
    if (WeekNo) {
      whereClauses.push('WeekNo = :WeekNo');
      replacements.WeekNo = WeekNo;
    }
    if (StyleCode) {
      whereClauses.push('StyleCode = :StyleCode');
      replacements.StyleCode = StyleCode;
    }

    let whereSQL = '';
    if (whereClauses.length > 0) {
      whereSQL = 'WHERE ' + whereClauses.join(' AND ');
    }
    
    // Query filtered data from view
    const query = `SELECT * FROM VuDashBoardData ${whereSQL}`;
    const filteredData = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      replacements,
      raw: true,
    });

    // Calculate total OPDQty sum
    const totalOrders = filteredData.reduce((sum, item) => sum + (item.OPDQty || 0), 0);

    // Return filtered data and total orders sum
    return res.status(200).json({
      success: true,
      data: filteredData,
      totalOrders,
    });
  } catch (err) {
    console.error('db error:', err);
    return res.status(500).json({
      success: false,
      message: 'Error fetching sales order data',
      error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
    });
  }
};

module.exports = homeDashboard;

// http://10.10.21.231:3000/dummy?Buyer=VINGINO
// http://10.10.21.231:3000/dummy?Buyer=GROUPE%20AUCHAN
// http://10.10.21.231:3000/dummy?Buyer=KMART%20AUSTRALIA%20LIMITED
// http://10.10.21.231:3000/dummy?Buyer=MAX%20HOLDINGS%20-%20INVESTMENTS%20LTD
// http://10.10.21.231:3000/dummy?Buyer=H%26M%20HENNES%20%26%20MAURITZ%20GBC%20AB