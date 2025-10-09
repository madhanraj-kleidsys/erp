const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path:path.join(__dirname, ".env")});

const corsOptions ={
    origin:'*',
    // [process.env.VITE_URL , `http://localhost:3000`],
    methods:['GET','POST','DELETE','PUT'],
    Credentials:true
};
app.use(cors(corsOptions));
// corsOptions

// const dbConnect = require('./config/db');

const login = require('./routes/login.js');
const approval = require('./routes/approval.js');
const { getSalesOrderData,getSalesOrderById} = require('./routes/salesOrderReport.js');
const approvalCount = require('./routes/approvalCounts.js');
const {salesOrder2,SERVINVOICE,VENDORBILL,STKRECPNOTE,STYLEJOBWORK,PROCUREORDER,STKREQUESTNOTE} = require('./routes/salesOrder2');

const {apparalOrderHeader} = require('./routes/salesOrderBudget/apparalOrderHeader.js');
const appoinmentorder = require('./routes/report/appoinmentorder.js');
const prdStatus = require('./routes/prdStatus.js');

const prodapparelsewing = require('./routes/dash/ProdApparelSewing.js');
const {getCitiesByState} = require('./routes/cities/getCitiesByState.js');

const pincodeState = require('./routes/cities/pincodeState.js');
const apiCity = require('./routes/cities/apiCity.js');
const employeeSearch = require('./routes/employeeSearch.js');


app.use('/api',login);
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
app.use('/api/prodapparelsewing',prodapparelsewing);
app.use('/api/getCitiesByState',getCitiesByState);
app.use('/api',pincodeState);
app.use('/api',apiCity);
app.get('/api/employee-search', employeeSearch);



// app.use('/api/salesreport',salesOrderReport);

// Serve static files from React build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Catch-all handler to send React's index.html for any request not handled by API
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
app.listen(3000,'0.0.0.0',() =>{
    console.log(`server listening to  AT ${PORT} ${NODE_ENV}`);
    
});