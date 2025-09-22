const sequelize = require('../../config/db');
const { QueryTypes } = require('sequelize');

// C:\Users\monis\Projects\erp\ui\backend\config\db.js
const apparalOrderHeader = async (req, res) => {
    try {

        // :SlsOrderID
        const query = ` 
            SELECT B.Name AS CoName,
                C.Name AS BUName,
                D.FullAddress + ', ' + ISNULL(D.City,'') + ', ' + ISNULL(D.State,'') + ' - ' + ISNULL(D.PostalCode,'') AS BUAddress,
                A.DocNo,
                CONVERT(VARCHAR,A.DocDate,106) AS DocDate,
                A.DocStatus,
                A.WFStatus,
                A.CreatedOn,
                E.FullName AS CreatedBy,
                A.LastModifiedOn,
                A.LastModifiedBy,
                REPLACE(A.CustomerName,'&','N') AS CustomerName,
                F.Name AS Season,
                A.OrderCurrency,
                --E.Currency,
                CAST(A.CurrencyConversion AS DECIMAL(20,2)) AS CurrencyConversion,
                CAST(ROUND(A.OrderLevelExcessPercent,0) AS int) AS OrderLevelExcessPercent,
                A.MerchandiserName,
                A.FinalDeliveryDate,
                A.ExFactoryDate,
                A.BaseFabricQuality,
                A.BaseFabricGSM,
                A.BuyerPONo,
                A.BuyerPODate,
                A.CostingNo,
                A.ProdnCostMarginPercent,
                CONVERT(DECIMAL(30,4), A.FabricCost) AS FabricCost,
                CONVERT(DECIMAL(30,4),A.TrimCost) AS TrimCost,
                CONVERT(DECIMAL(30,4),A.CMTCost) AS CMTCost,
                CONVERT(DECIMAL(30,4),A.ValueAdditions) AS ValueAdditions,
                CONVERT(DECIMAL(30,4),A.OtherCost) AS OtherCost,
                CONVERT(DECIMAL(30,4),A.TotalCost) AS TotalCost,
                CONVERT(DECIMAL(30,4),A.FabricCostCC) AS FabricCostCC,
                CONVERT(DECIMAL(30,4),A.TrimCostCC) AS TrimCostCC,
                CONVERT(DECIMAL(30,4),A.CMTCostCC) AS CMTCostCC,
                CONVERT(DECIMAL(30,4),A.ValueAdditionsCC) AS ValueAdditionsCC,
                CONVERT(DECIMAL(30,4),A.OtherCostCC) AS OtherCostCC,
                CONVERT(DECIMAL(30,4),A.TotalCostCC) AS TotalCostCC, 
                CONVERT(DECIMAL(30,4),A.FabricCostPercent) AS FabricCostPercent,
                CONVERT(DECIMAL(30,4),A.FabricCostPercentCC) AS FabricCostPercentCC,
                CONVERT(DECIMAL(30,4),A.BookedValue) AS BookedValue,
                CONVERT(DECIMAL(30,4),A.BookedValueCC) AS BookedValueCC,
                CONVERT(DECIMAL(30,4),A.BudgetValue) AS BudgetValue,
                CONVERT(DECIMAL(30,4),A.BudgetValueCC) AS BudgetValueCC,
                CONVERT(DECIMAL(30,4),A.ProdGmtCost) AS ProdGmtCost,
                CONVERT(DECIMAL(30,4),A.ProdGmtCostCC) AS ProdGmtCostCC,
                CONVERT(DECIMAL(30,4),A.ShipGmtCost) AS ShipGmtCost,
                CONVERT(DECIMAL(30,4),A.ShipGmtCostCC) AS ShipGmtCostCC,
                CONVERT(DECIMAL(30,4),A.BookingGmtCost) AS BookingGmtCost,
                CONVERT(DECIMAL(30,4),A.BookingGmtCostCC) AS BookingGmtCostCC,
                CONVERT(DECIMAL(30,4),A.MarginPerGmt) AS MarginPerGmt,
                CONVERT(DECIMAL(30,4),A.MarginPerGmtCC) AS MarginPerGmtCC,
                CONVERT(DECIMAL(30,4),A.MarginPerGmtPercent) AS MarginPerGmtPercent,
                CONVERT(DECIMAL(30,4),A.MarginPerGmtPercentCC) AS MarginPerGmtPercentCC,
                CONVERT(DECIMAL(30,4),A.TotalMargin) AS TotalMargin,
                CONVERT(DECIMAL(30,4),A.TotalMarginCC) AS TotalMarginCC,	
                CONVERT(DECIMAL(30,4),A.TrimCostPercent) AS TrimCostPercent,
                CONVERT(DECIMAL(30,4),A.CMTCostPercent) AS CMTCostPercent,
                CONVERT(DECIMAL(30,4),A.ValueAdditionsPercent) AS ValueAdditionsPercent,
                CONVERT(DECIMAL(30,4),A.OtherCostPercent) AS OtherCostPercent,
                CONVERT(DECIMAL(30,4),A.TotalCostPercent) AS TotalCostPercent,
                CONVERT(DECIMAL(30,4),A.FlatknitCost) AS FlatknitCost,
                CONVERT(DECIMAL(30,4),A.FlatknitCostCC) AS FlatknitCostCC, 
                CONVERT(DECIMAL(30,4),A.FlatknitCostPercent) AS FlatknitCostPercent,
                CONVERT(DECIMAL(30,4),(ISNULL(G1.Qty,0))) AS OrdQty,
				CONVERT(DECIMAL(30,4),(ISNULL(G1.PrdQty,0))) AS PrdQty,
				CONVERT(DECIMAL(30,4),(ISNULL(G1.QtywithExcess,0))) AS QtywithExcess,
                CONVERT(DECIMAL(30,4),AVG(H.ExcessPercent)) AS ExcessPercent,
				B.LogoFileName + '/Uploads/' + ISNULL(ISNULL(T.FileAliasName,T1.FileAliasName),'NoImg.PNG') AS AttachmentURI,
                I.FactoryNameCSV,
                WF.FullName AS ApprovedBy,
                CASE A.OrderType
                    WHEN 'BO' THEN 'Buyer Order'
                    WHEN 'CO' THEN 'CAPA Order'
                    WHEN 'ST' THEN 'Stock Order'
                    WHEN 'FS' THEN 'Fabric Sample'
                    WHEN 'BP' THEN 'Booking / Provisional Order'
                    ELSE 'Not Selected'
                END AS OrderType,
                CASE A.IsSetOrder
                    WHEN '1' THEN 'SETS'
                    WHEN '0' THEN 'PCS'
                END AS IsSet,
                A.SpecialInstruction,
                CASE
                    WHEN ISNULL(C.LogoName,'') = '' THEN
                        B.LogoFileName + '/Uploads/' + B.LogoName
                    ELSE 
                        B.LogoFileName + '/Uploads/' + C.LogoName
                END AS ImageURI,
                MAX(ISNULL(G.Rate,0)) AS FOBOrdCurr,
                MAX(ISNULL(G.Rate,0)) * A.CurrencyConversion AS FOBOprCurr,
                CONVERT(DECIMAL(30,4),A.MarginPerGmt * 0.80) AS MrgnSplit1,
                CONVERT(DECIMAL(30,4),A.MarginPerGmt * 0.20) AS MrgnSplit2,
                CONVERT(DECIMAL(30,4),A.MarginPerGmtPercent * 0.80) AS MrgnPerSplit1,
                CONVERT(DECIMAL(30,4),A.MarginPerGmtPercent * 0.20 ) AS MrgnPerSplit2,
				J.FullName AS MMGRName
            FROM SalesApparelOrder2 A
            LEFT JOIN OrgCompany B ON B.ID =  A.CompanyID
            LEFT JOIN OrgBusinessUnit C ON C.ID = A.BUID
            LEFT JOIN MasAddresses D ON D.ID = C.AddressID
            LEFT JOIN AdmUsers E ON E.UserName = A.CreatedBy
            LEFT JOIN MasApparelSeason F ON F.Code = A.Season
            LEFT JOIN SalesApparelOrder2ItemBreakUp G ON G.SAO2ID = A.ID
			OUTER APPLY FN_SAO2TotQtyByID (A.ID) G1
			LEFT JOIN SAO2ItemsSetMap H1 ON H1.SAO2ID = A.ID
            LEFT JOIN SalesApparelOrder2Items H ON H.SAO2ID = A.ID
                AND 
					((A.IsSetOrder = 0 AND H.StyleDesc = G.StyleCode)
					OR
					(A.IsSetOrder = 1 AND H1.StyleCode = G.StyleCode))
            --LEFT JOIN MasCurrencies E ON E.AlphabeticCode = A.OrderCurrency
            OUTER APPLY FN_SAOFactoryNameCSV(A.ID) I
            LEFT JOIN CommonFileAttachments T ON T.TransactionID = A.ID
                AND T.TransactionCode = 'SALESOREDR2'
                AND T.IsActive = 1
			LEFT JOIN 
				(
					SELECT A.TransactionID,
						A.TransactionCode,
						A.IsActive,
						A.FileAliasName,
						B.Code AS StyleCode
					FROM CommonFileAttachments A
					LEFT JOIN MasApparelStyles B ON B.ID = A.TransactionID
					WHERE A.TransactionCode = 'MASSTYLE'
						AND A.IsActive = 1
				) T1 ON T1.StyleCode = G.StyleCode
			OUTER APPLY FN_WFLastApproved(A.ID, 'SALESOREDR2') WF
			LEFT JOIN
				(
					SELECT D.FullName, C.ID
					FROM AdmUserGroupUsers A
					JOIN AdmUserGroup B ON B.ID = A.UserGroupID
					JOIN SalesApparelOrder2 C ON C.MerchandiserName = B.Name
					JOIN AdmUsers D ON D.ID = A.UserID
					JOIN OrgDesignations E ON E.ID = D.DesignationID
					WHERE E.Name = 'MERCHANDISER MANAGER'
				) J ON J.ID = A.ID
            WHERE A.ID = 125
				AND G1.Qty > 0
            GROUP BY B.Name,
                C.Name,
                D.FullAddress,
                D.City,
                D.State,
                D.PostalCode,
                A.DocNo,
                A.DocDate,
                A.DocStatus,
                A.WFStatus,
                A.CreatedOn,
                E.FullName,
                A.LastModifiedOn,
                A.LastModifiedBy,
                A.CustomerName,
                F.Name,
                A.OrderCurrency,
                A.CurrencyConversion,
                A.OrderLevelExcessPercent,
                A.MerchandiserName,
                A.FinalDeliveryDate,
                A.ExFactoryDate,
                A.BaseFabricQuality,
                A.BaseFabricGSM,
                A.BuyerPONo,
                A.BuyerPODate,
                A.CostingNo,
                A.ProdnCostMarginPercent,
                A.FabricCost,
                A.TrimCost,
                A.CMTCost,
                A.ValueAdditions,
                A.OtherCost,
                A.TotalCost,
                A.FabricCostCC,
                A.TrimCostCC,
                A.CMTCostCC,
                A.ValueAdditionsCC,
                A.OtherCostCC,
                A.TotalCostCC,
                A.FabricCostPercent,
                A.FabricCostPercentCC,
                A.BookedValue,
                A.BookedValueCC,
                A.BudgetValue,
                A.BudgetValueCC,
                A.ProdGmtCost,
                A.ProdGmtCostCC,
                A.ShipGmtCost,
                A.ShipGmtCostCC,
                A.BookingGmtCost,
                A.BookingGmtCostCC,
                A.MarginPerGmt,
                A.MarginPerGmtCC,
                A.MarginPerGmtPercent,
                A.MarginPerGmtPercentCC,
                A.TotalMargin,
                A.TotalMarginCC,
                A.TrimCostPercent,
                A.CMTCostPercent,
                A.ValueAdditionsPercent,
                A.OtherCostPercent,
                A.TotalCostPercent,
                A.FlatknitCost,
                A.FlatknitCostCC, 
                A.FlatknitCostPercent,
                I.FactoryNameCSV,
                T.FileAliasName,
                --H.ExcessPercent,
                WF.FullName,
                A.OrderType,
                A.IsSetOrder,
                A.SpecialInstruction,
                B.LogoFileName,
                B.LogoName,
                C.LogoName,
				J.FullName,
				G1.Qty,
				G1.PrdQty,
				G1.QtywithExcess,
				T1.FileAliasName
                `;

        const op = await sequelize.query(query, {
            type: QueryTypes.SELECT, raw: true
        });

        return res.status(200).json({
            success:true,data:op
        })
    } catch(err){
        console.error('db error');
        return res.status(500).json({
            success:false,
             message: 'Error fetching sales order data',
      error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
        })
        
    }
};
module.exports = {apparalOrderHeader};
 