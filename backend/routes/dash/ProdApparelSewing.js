const sequelize = require('../../config/db');
const { QueryTypes } = require('sequelize');
const express = require('express');
const router = express.Router();

router.post('/getByMonthYear', async (req, res) => {
    const { year, month } = req.body;

    const mm = String(month).padStart(2, '0');
    const startDate = `${year}-${mm}-01`;
    const endDate = `${year}-${mm}-31`;
    try {
        const query = ` 
         ;WITH DateSeries AS
(
    SELECT DISTINCT
        C.DocNo AS OCNo,
        A.LineCode,
        A.StartDate,
        A.TargetDate,
        A.DailyTarget,
        E.Name AS BUName,
        F.MasApparelStylesCode, 
        N = 0
    FROM ProdApparelSewingLines A
    JOIN ProdApparelOrder B ON B.DocNo = A.ProdApparelOrderID
    JOIN SalesApparelOrder2 C ON C.ID = B.SalesApparelOrderID
    JOIN MasApparelSewingLines D ON D.Code = A.LineCode
    JOIN OrgBusinessUnit E ON E.ID = D.BUID
    JOIN ProdApparelOrderStyles F ON F.ProdApparelOrderID = B.ID
  
    UNION ALL
     SELECT 
        OCNo,
        LineCode,
        StartDate,
        TargetDate,
        DailyTarget,
        BUName,
        MasApparelStylesCode,
       
        N + 1
    FROM DateSeries
    WHERE DATEADD(DAY, N + 1, StartDate) <= TargetDate
)
SELECT 
    OCNo,
    LineCode,
    DATEADD(DAY, N, StartDate) AS ProdDate,
    DailyTarget,
    BUName,
    DATENAME(MONTH, DATEADD(DAY, N, StartDate)) AS MnthName,
    DATEPART(YEAR, DATEADD(DAY, N, StartDate)) AS YearNo,
    DATEPART(WEEK, DATEADD(DAY, N, StartDate)) AS WeekNo
    
FROM DateSeries
WHERE YEAR(DATEADD(DAY, N, StartDate)) = :year
  AND MONTH(DATEADD(DAY, N, StartDate)) = :month
ORDER BY LineCode, ProdDate, MasApparelStylesCode 
OPTION (MAXRECURSION 0);
`;

        const op = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            raw: true,
            replacements: { year, month }
        });

        return res.status(200).json({
            success: true, data: op
        })
    } catch (err) {
        console.error('db error');
        return res.status(500).json({
            success: false,
            message: 'Error fetching sales order data',
            error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        })

    }
});



module.exports = router;
