require('dotenv').config();

const common = {
  underscored: true,
  dialectOptions: {
    useUTC: true, //for reading from database
    dateStrings: true, // ! 데이터 로드시 문자열로 가저옴
    typeCast: true, // ! 타임존을 역으로 계산하지 않음
  },
  timezone: '+09:00', //for writing to database
};

module.exports = {
  development: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql',
    ...common,
  },
  test: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql',
    ...common,
  },
  production: {
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    database: process.env.SEQUELIZE_DATABASE,
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    ...common,
  },
};
