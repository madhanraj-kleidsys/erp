const sequelize = require('../../config/db');
const { QueryTypes } = require('sequelize');

const getCitiesByState = async (req, res) => {
    try {
        const stateName = req.query.state;
        if (!stateName) {
            return res.status(400).json({ success: false, message: 'State query parameter is required' });
        }
        const query = `
          SELECT city_name
          FROM cities
          WHERE city_state = :stateName
          ORDER BY city_name
        `;
        const cities = await sequelize.query(query, {
            replacements: { stateName },
            type: QueryTypes.SELECT,
            raw: true
        });

        return res.status(200).json({ success: true, data: cities });
    } catch (err) {
        console.error('DB error:', err);
        return res.status(500).json({
            success: false,
            message: 'Error fetching cities',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        });
    }
};

module.exports = { getCitiesByState };
