// models/invStockDelivery.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const InvStockDelivery = sequelize.define('InvStockDelivery', {
  ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  InvStockDeliveryID: DataTypes.INTEGER,
  InvStockDeliveryMaterialsID: DataTypes.INTEGER,
  IsActive: DataTypes.BOOLEAN,
  StockStatus: DataTypes.STRING,
  MaterialCode: DataTypes.STRING,
  Identifier1: DataTypes.STRING,
  Identifier2: DataTypes.STRING,
  Identifier3: DataTypes.STRING,
  Identifier4: DataTypes.STRING,
  Identifier5: DataTypes.STRING,
  Quantity1: DataTypes.DECIMAL,
  UOM1: DataTypes.STRING,
  Quantity2: DataTypes.DECIMAL,
  UOM2: DataTypes.STRING,
  Quantity3: DataTypes.DECIMAL,
  UOM3: DataTypes.STRING,
  Quantity4: DataTypes.DECIMAL,
  UOM4: DataTypes.STRING,
  Quantity5: DataTypes.DECIMAL,
  UOM5: DataTypes.STRING,
  ReferenceType: DataTypes.STRING,
  ReferenceSource: DataTypes.STRING,
  ReferenceValue: DataTypes.STRING,
  Remarks: DataTypes.STRING,
  InvStaticStockID: DataTypes.INTEGER,
  StockStamp: DataTypes.STRING,
  OperationCode: DataTypes.STRING,
  BuyerPoNo: DataTypes.STRING,
  PoNo: DataTypes.STRING,
}, {
  tableName: 'InvStockDelivery',
  schema: 'dbo',
  timestamps: false,
});

module.exports = InvStockDelivery;
