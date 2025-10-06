// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const [host, instanceName] = process.env.DB_HOST.includes('\\') 
//   ? process.env.DB_HOST.split('\\') 
//   : [process.env.DB_HOST, undefined];

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: host,
//     // port: instanceName ? undefined : (process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 1433),
//     dialect: 'mssql',
//     port:1433,
//     dialectOptions: {
//       options: {
//         encrypt: process.env.DB_ENCRYPT === 'true',
//         trustServerCertificate: process.env.DB_TRUSTSERVERCERTIFICATE === 'true',
//         instanceName: instanceName || undefined,
//       },
//     },
//     logging: false,
//   }
// );

// sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected successfully.');
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');
require('dotenv').config();

const [host, instanceName] = process.env.DB_HOST.split('\\');

const sequelize = new Sequelize(

  process.env.DB_NAME,

  process.env.DB_USER,

  process.env.DB_PASS,

  {

    host,

    port: 1433,

    dialect: 'mssql',

    dialectOptions: {

      options: {

        encrypt: process.env.DB_ENCRYPT === 'true',

        trustServerCertificate: process.env.DB_TRUSTSERVERCERTIFICATE === 'true',

        instanceName: instanceName || undefined,

      },

    },

    logging: false,

  }

);

sequelize.authenticate()

  .then(() => {

    console.log('Database connected successfully.');

  })

  .catch((error) => {

    console.error('Unable to connect to the database:', error);

  });

module.exports = sequelize;

