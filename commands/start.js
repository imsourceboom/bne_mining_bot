const { User, Profitability } = require('../models');
const { bot } = require('../app');
const { startMessage } = require('./variables');

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const message = startMessage(username, chatId);

  const gif =
    'https://postfiles.pstatic.net/MjAyMTAxMTBfNjMg/MDAxNjEwMjY2NTI5NjQx.NBlwV5u1rJlR_1vnJZVKuk0_rv2oZY8wSVT79z5NdUog.GrvU2GjH9MMhlyC5e_l7ev5VFjCYd8FAwAxS0Y5LJ-Ug.GIF.freefutsal/toncity.gif?type=w966';

  const profitability = await Profitability.findOne({ where: { id: 1 } });
  if (profitability == undefined) {
    Profitability.create({
      total_profit: 5.0044,
    });
  }

  const user = await User.findOne({ where: { user_id: chatId } });
  if (user == undefined) {
    User.create({
      user_id: chatId,
      username,
    });
  }

  bot.sendDocument(chatId, gif, {
    caption: message,
    parse_mode: 'html',
  });

  setTimeout(() => {
    bot.sendMessage(chatId, '스테이킹 수량을 선택 해주세요 &#x1F447;', {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '💎 12,000', callback_data: '12000' },
            { text: '💎 13,000', callback_data: '13000' },
          ],
        ],
      },
    });
  }, 500);
});
