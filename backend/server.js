const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());

const dbConnect = require('./config/db');


const dotenv = require('dotenv');
const path = require('path');
// const { env } = require('process');0
dotenv.config({path:path.join(__dirname, ".env")});
 


const approval = require('./routes/approval.js');
const { getSalesOrderData,getSalesOrderById} = require('./routes/salesOrderReport.js');
const approvalCount = require('./routes/approvalCounts.js');
const {salesOrder2,SERVINVOICE,VENDORBILL,STKRECPNOTE,STYLEJOBWORK,PROCUREORDER,STKREQUESTNOTE} = require('./routes/salesOrder2');

const {apparalOrderHeader} = require('./routes/salesOrderBudget/apparalOrderHeader.js');
const appoinmentorder = require('./routes/report/appoinmentorder.js');
const prdStatus = require('./routes/prdStatus.js');

app.use('/api/approval',approval);
app.get('/api/approvalCount',approvalCount);
app.get('/api/sales-order', getSalesOrderData);
app.get('/api/sales-order/:orderId', getSalesOrderById);

app.get('/api/salesOrder2',salesOrder2);
app.get('/api/servInvoice',SERVINVOICE);
app.get('/api/vendorBill',VENDORBILL);
app.get('/api/stkRecpNote',STKRECPNOTE);
app.get('/api/styleJobWork',STYLEJOBWORK);
app.get('/api/procureOrder',PROCUREORDER);
app.get('/api/stkRequestNote',STKREQUESTNOTE);

app.get('/api/apparalOrderHeader',apparalOrderHeader);

app.post('/api/appoinmentorder',appoinmentorder);
app.use('/api',prdStatus);

// app.use('/api/salesreport',salesOrderReport);

const PORT = process.env.DB_PORT;
const NODE_ENV = process.env.NODE_ENV;
app.listen(PORT ,'0.0.0.0' ,() =>{
    console.log(`server listening to ${PORT} AT ${NODE_ENV}`);
    
})

// const express = require('express');
// const cors = require('cors');
// const { getSalesOrderData } = require('./routes/salesOrderReport');

// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get('/api/sales-order', getSalesOrderData);

// const PORT = process.env.DB_PORT || 3001;
// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
