process.env.NTBA_FIX_319 = 1;

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;
const { sequelize } = require('./models');

exports.bot = new TelegramBot(token, { polling: true });
sequelize.sync();

require('./commands/start');
// require('./commands/test');
require('./commands/amount');
require('./commands/state');
require('./commands/cron');
