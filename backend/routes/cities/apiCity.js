const express = require('express');
const axios = require('axios');
const router = express.Router();
const sequelize = require('../../config/db');

// router.get('/sync-pincode', async (req, res) => {
//   try {
//     // 1. Fetch the data from the remote API
//     const apiUrl = 'https://api.data.gov.in/resource/5c2f62fe-5afa-4119-a499-fec9d604d5bd?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=100'; // adjust limit as needed
//     const response = await axios.get(apiUrl);

//     if (!response.data.records || !Array.isArray(response.data.records)) {
//       return res.status(400).json({ success: false, message: 'No records found' });
//     }

//      // let count = 0;
//     // for (const item of response.data.records) {
//     //   const officename = item.officename || '';
//     //   const pincode = (item.pincode || '').toString();
//     //   const district = item.district || '';
//     //   const state = item.statename || '';
 
//     //   await sequelize.query(
//     //     `INSERT INTO apiPincode (officeName, Pincode, District, State) 
//     //      VALUES (:officename, :pincode, :district, :state)`,
//     //     {
//     //       replacements: { officename, pincode, district, state }
//     //     }
//     //   );
//     //   count++;
//     // }

//  const values = [];
//     const placeholders = [];

//     for (const item of response.data.records) {
//       placeholders.push('(?, ?, ?, ?)');
//       values.push(
//         item.officename || '',
//         (item.pincode || '').toString(),
//         item.district || '',
//         item.statename || ''
//       );
//     }
//  const sql = `INSERT INTO apiPincode (officeName, Pincode, District, State) VALUES ${placeholders.join(', ')}`;

//     await sequelize.query(sql, { replacements: values });

//     res.json({ success: true, inserted: response.data.records.length });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

router.get('/sync-pincode', async (req, res) => {
  try {
    const apiUrl = 'https://api.data.gov.in/resource/5c2f62fe-5afa-4119-a499-fec9d604d5bd?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&limit=100';
    const response = await axios.get(apiUrl);

    if (!response.data.records || !Array.isArray(response.data.records)) {
      return res.status(400).json({ success: false, message: 'No records found' });
    }

    // Build placeholders and replacements array
    const values = [];
    const placeholders = [];

    for (const item of response.data.records) {
      placeholders.push('(?, ?, ?, ?)');
      values.push(
        item.officename || '',
        (item.pincode || '').toString(),
        item.district || '',
        item.statename || ''
      );
    }
const sql = `INSERT INTO apiPincode (officeName, Pincode, District, State) VALUES ${placeholders.join(', ')}`;
await sequelize.query(sql, { replacements: values });

    // const sql = `INSERT IGNORE INTO apiPincode (officeName, Pincode, District, State) VALUES ${placeholders.join(', ')}`;
    // await sequelize.query(sql, { replacements: values });

    res.json({ success: true, inserted: response.data.records.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


module.exports = router;
