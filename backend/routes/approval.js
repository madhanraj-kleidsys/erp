const express = require('express');
const router =  express.Router();

const approvalModel = require('../models/approvalModel');
// const InvStockDelivery = require('../models/invStockDeliveryDetails');

// router.get('/getdata' , async(req,res)=>{
//     try{
//         const approvalData = await approvalModel.findAll();
//         // const InvStockData = await InvStockDelivery.findAll();
//         const [results] = await InvStockDelivery.query('SELECT TOP 5 * FROM dbo.InvStockDelivery');
// console.log(results);

//         console.log(InvStockDelivery.MaterialCode);
//         console.log(approvalData,InvStockData)
        
//         res.status(200).json(
//             {success:true,
//             message:'all items got success',
//             approvalData,
//             // InvStockData
//         }
//         );
//     }
//     catch (err){
//         res.status(400).json({
//             success:false,
//             message:`data not get : ${err}`,
//             err
//         })
//     }
// });

// module.exports = router;

// const InvStockDelivery = require('../models/InvStockDelivery');

router.get('/getdata', async (req, res) => {
  try {
    const data = await approvalModel.findAll();
  // console.log(data);
  
    res.status(200).json({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, message: 'Data not retrieved: ',e});
  }
});

module.exports=router;