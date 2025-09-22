
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  

const AdmDocumentNumberConstructs = sequelize.define('AdmDocumentNumberConstructs', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Code: DataTypes.STRING,
  Name: DataTypes.STRING,
  IsActive: DataTypes.INTEGER,
}, {
  tableName: 'AdmDocumentNumberConstructs',
  timestamps: false,
});

module.exports = AdmDocumentNumberConstructs;
