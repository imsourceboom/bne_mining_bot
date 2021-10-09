const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Amount = require('./amount')(sequelize, Sequelize);
db.Profitability = require('./profitability')(sequelize, Sequelize);

db.User.hasOne(db.Amount, { foreignKey: 'owner', sourceKey: 'id' });
db.Amount.belongsTo(db.User, { foreignKey: 'owner', targetKey: 'id' });

module.exports = db;
