module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'user',
    {
      user_id: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
