module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'profitability',
    {
      total_profit: {
        type: DataTypes.DECIMAL(8, 4),
        allowNull: false,
      },
      previous_profit: {
        type: DataTypes.DECIMAL(8, 4),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
