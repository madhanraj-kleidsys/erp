const sequelize = require('../config/db');
const { QueryTypes } = require('sequelize');

const employeeSearch = async (req, res) => {
    try {
        const { query, limit = 10 } = req.query;

        if (!query || query.trim().length < 2) {
            return res.status(200).json({
                success: true,
                data: []
            });
        }

        const searchTerm = `%${query.trim()}%`;

        const searchQuery = `
            SELECT TOP ${parseInt(limit)}
                A.ID AS EmpID,
                A.FirstName AS EmpName,
                A.EmployeeCode AS EmpCode,
                B.Name AS Dept,
                C.Name AS Desg,
                A.MobileNo,
                A.PersonalMobileNo,
                CONCAT(A.FirstName, ' (', A.EmployeeCode, ')') AS DisplayText
            FROM MasHREmployee A
            LEFT JOIN MasHRDepartment B ON B.ID = A.DepartmentID
            LEFT JOIN OrgDesignations C ON C.ID = A.DesignationID
            WHERE (
                A.FirstName LIKE :searchTerm 
                OR A.EmployeeCode LIKE :searchTerm
                OR A.MobileNo LIKE :searchTerm
                OR A.PersonalMobileNo LIKE :searchTerm
            )
            AND A.IsActive = 1
            ORDER BY A.FirstName
        `;

        const results = await sequelize.query(searchQuery, {
            replacements: { searchTerm },
            type: QueryTypes.SELECT,
            raw: true
        });

        res.status(200).json({
            success: true,
            data: results
        });

    } catch (err) {
        console.error('Employee search error:', err.message);
        res.status(500).json({
            success: false,
            message: 'Error searching employees',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        });
    }
};

module.exports = employeeSearch;