const sequelize = require('../../config/db');
const { QueryTypes } = require('sequelize');

const appoinmentorder = async (req, res) => {
	try {
		const { empId, empName, empCode, MobileNo, Desg, Dept, address } = req.body;

		const isNonEmpty = (vaa) => vaa && vaa.trim() !== '';

		let whereClauses = [];
		let replacements = {};


		if (isNonEmpty(empId)) {
			whereClauses.push('A.ID = :empId');
			replacements.empId = empId.trim();
		}
		if (isNonEmpty(empCode)) {
			whereClauses.push('A.EmployeeCode = :empCode');
			replacements.empCode = empCode.trim();
		}
		if (isNonEmpty(Desg)) {
			whereClauses.push('C.Name = :Desg');
			replacements.Desg = Desg.trim();
		}
		if (isNonEmpty(Dept)) {
			whereClauses.push('B.Name = :Dept');
			replacements.Dept = Dept.trim();
		}
		if (isNonEmpty(empName)) {
			whereClauses.push('A.FirstName LIKE :empName');
			replacements.empName = `%${empName.trim()}%`;
		}
		if (isNonEmpty(MobileNo)) {
			whereClauses.push('(A.MobileNo = :MobileNo OR A.PersonalMobileNo = :MobileNo)');
			replacements.MobileNo = MobileNo.trim();
		}
		if (isNonEmpty(address)) {
			whereClauses.push('A.CurrentAddress LIKE :address OR A.PermanentAddress LIKE :address');
			replacements.address = `%${address.trim()}%`;
		}

		if (whereClauses.length === 0) {
			return res.status(400).json({
				success: false,
				message: 'pls prvide atleast one filter from { empId, empName, EmpCode, MobileNo, Desg, Dept, address }'
			});
		}

		const whereString = 'WHERE ' + whereClauses.join(' OR ');

		const query = `
 SELECT A.ID AS EmpID,
				A.FirstName AS EmpName,
				A.EmployeeCode AS EmpCode,
				B.Name AS Dept,
				C.Name AS Desg,
				D.Name AS Location,
				A.BankAccountNo,
				E.Name AS CmpName,
				D.Name AS BUName,
				G.Name AS Grade,
				G.Code AS GradeCode,
				ISNULL(A.Grosssalary,0) AS Gross,
				I.Code AS ShiftCode,
				CONVERT(VARCHAR(8),I.ShiftStartTime) AS ShiftStartTime,
				CONVERT(VARCHAR(8),I.ShiftEndTime) AS ShiftEndTime,
				F.FullAddress + ISNULL(' - ' + F.PostalCode,'') AS Addr,
				CASE
                    WHEN ISNULL(D.LogoName,'') <> '' THEN E.LogoFileName + '/Uploads/' + D.LogoName
                    ELSE E.LogoFileName + '/Uploads/' + E.LogoName
                END AS ComLogo,
				A.FathersName,
				A.Religion,
				A.BloodGroup,
				CONVERT(VARCHAR(20),A.DateOfBirth,106) AS DateOfBirth,
				CONVERT(VARCHAR(20),A.JoiningDate,106) AS JoiningDate,
				H.Name AS EmpCategory,
				J.Name AS Grade,
				K.Name AS Shift,
				A.PFNo,
				A.ESICNo,
				A.MobileNo,
				A.PersonalMobileNo,
				A.EmailID,
				A.PersonalEmailID,
				A.AadharNo,
				A.CurrentAddress + ISNULL(', ' + A.CurrentCity, '') + ISNULL(', ' + A.CurrentState, '') + ISNULL(' - ' + A.CurrentPostalCode, '')
					+ ISNULL(', ' + L.Name, '') AS CurrentAddress,
				A.PermanentAddress + ISNULL(', ' + A.PermanentCity, '') + ISNULL(', ' + A.PermanentState, '') + ISNULL(' - ' + A.PermanentPostalCode, '')
					+ ISNULL(', ' + M.Name, '') AS PermanentAddress,
				CASE WHEN A.MaritalStatus = 'M' THEN 'MARRIED' ELSE 'UNMARRIED' END AS MaritalStatus,
				CASE WHEN A.Gender = 'M' THEN 'MALE' ELSE 'FEMALE' END AS Gender,
				A.LastModifiedOn,
				--N.FullName AS UserName,
				A.MothersName,
               CASE WHEN ISNULL(D.LogoName,'') <> '' THEN E.LogoFileName + '/Uploads/' + A.LogoName ELSE E.LogoFileName + '/Uploads/' + A.LogoName
                END AS EmpImg,

				E1.Amount AS ED1,
				E1.EDCode AS ED1Code,
				E2.Amount AS ED2,
				E2.EDCode AS ED2Code,
				E3.Amount AS ED3,
				E3.EDCode AS ED3Code,
				E4.Amount AS ED4,
				E4.EDCode AS ED4Code,
				E5.Amount AS ED5,
				E5.EDCode AS ED5Code,
				E6.Amount AS ED6,
				E6.EDCode AS ED6Code,
				E7.Amount AS ED7,
				E7.EDCode AS ED7Code,
				E8.Amount AS ED8,
				E8.EDCode AS ED8Code,
				E9.Amount AS ED9,
				E9.EDCode AS ED9Code,
				E10.Amount AS ED10,
				E10.EDCode AS ED10Code,
				F.City AS CompCity

			FROM MasHREmployee A
			LEFT JOIN MasHRDepartment B ON B.ID = A.DepartmentID
			LEFT JOIN OrgDesignations C ON C.ID = A.DesignationID
			LEFT JOIN OrgBusinessUnit D ON D.ID = A.BUID
			LEFT JOIN OrgCompany E ON E.ID = D.CompanyID
			LEFT JOIN MasAddresses F ON F.ID = D.AddressID
			LEFT JOIN MasHRGrade G ON G.ID = A.GradeID
			LEFT JOIN MasShifts I ON I.ID = A.ShiftID
			JOIN MasHREmployeeCategory H ON H.ID = A.EmployeeCategoryID
			LEFT JOIN MasHRGrade J ON J.ID = A.GradeID
			LEFT JOIN MasShifts K ON K.ID = A.ShiftID
			LEFT JOIN MasCountry L ON L.ID = A.CurrentCountry
			LEFT JOIN MasCountry M ON M.ID = A.PermanentCountry
			--LEFT JOIN AdmUsers N ON A.LastModifiedBy = A.UserName

			LEFT JOIN CommonFileAttachments O ON O.TransactionCode = 'MASHREMPLOYEE'
				AND O.TransactionID = A.ID

			OUTER APPLY FN_HRSalCompoAmt (A.ID, 'E1') E1
			OUTER APPLY FN_HRSalCompoAmt (A.ID, 'E2') E2
			OUTER APPLY FN_HRSalCompoAmt (A.ID, 'E3') E3
			OUTER APPLY FN_HRSalCompoAmt (A.ID, 'E4') E4
			OUTER APPLY FN_HRSalCompoAmt (A.ID, 'E5') E5
			OUTER APPLY FN_HRSalCompoAmt (A.ID, 'E6') E6
			OUTER APPLY FN_HRSalCompoAmt (A.ID, 'E7') E7
			OUTER APPLY FN_HRSalCompoAmt (A.ID, 'E8') E8
			OUTER APPLY FN_HRSalCompoAmt (A.ID, 'E9') E9
			OUTER APPLY FN_HRSalCompoAmt (A.ID, 'E10') E10
            ${whereString}`;

		const op = await sequelize.query(query, {
			replacements,
			type: QueryTypes.SELECT,
			raw: true
		})

		res.status(200).json({
			success: true,
			data: op
		})
	}
	catch (err) {
		console.error(err.message);
		res.status(500).json({
			success: false,
			message: 'Error fetching appoinment order data',
			error: { message: err.message, code: err.code || 'UNKNOWN_ERROR' }
		})
	}
}
module.exports = appoinmentorder;