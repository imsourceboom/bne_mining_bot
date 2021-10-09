module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'amount',
    {
      staking: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_reward: {
        type: DataTypes.DECIMAL(8, 4),
        allowNull: false,
      },
      previous_reward: {
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
