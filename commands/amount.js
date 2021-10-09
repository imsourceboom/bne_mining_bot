const { User, Amount, Profitability } = require('../models');
const { bot } = require('../app');
const { replyMarkupMainConfig, amountMessage } = require('./variables');

bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  const bg13000 =
    'https://toncrystal.today/wp-content/uploads/2020/10/2_b2.png';
  const bg12000 =
    'https://toncrystal.today/wp-content/uploads/2020/10/default_ver2-1360x765.png';

  const user = await User.findOne({ where: { user_id: chatId } });
  const stakingOwner = await Amount.findOne({
    where: { owner: user.dataValues.id },
  });
  const profitability = await Profitability.findOne({ where: { id: 1 } });

  const rewardAmount = (data * profitability.dataValues.total_profit) / 100;

  if (stakingOwner == undefined) {
    Amount.create({
      owner: user.dataValues.id,
      staking: parseInt(data),
      total_reward: rewardAmount,
    });
  } else {
    Amount.update(
      {
        staking: parseInt(data),
        total_reward: rewardAmount,
      },
      {
        where: { owner: user.dataValues.id },
      }
    );
  }

  const miningAssetAmount = parseFloat(rewardAmount).toFixed(4);
  const message = amountMessage(
    data,
    miningAssetAmount,
    profitability.dataValues.total_profit
  );

  if (data == 12000) {
    bot.sendPhoto(user.dataValues.user_id, bg12000, {
      caption: '💎 <b>12,000</b> TON 을 선택하셨습니다',
      parse_mode: 'html',
      reply_markup: replyMarkupMainConfig,
    });
    setTimeout(() => {
      bot.sendMessage(user.dataValues.user_id, message, {
        parse_mode: 'HTML',
      });
    }, 500);
  }

  if (data == 13000) {
    bot.sendPhoto(user.dataValues.user_id, bg13000, {
      caption: '💎 <b>13,000</b> TON 을 선택하셨습니다',
      parse_mode: 'html',
      reply_markup: replyMarkupMainConfig,
    });
    setTimeout(() => {
      bot.sendMessage(user.dataValues.user_id, message, {
        parse_mode: 'HTML',
      });
    }, 500);
  }
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const amountChoiceImage =
    'https://freeton.house/wp-content/uploads/2020/10/rezerv_001.png';

  if (msg.text == '💎 수량 선택') {
    bot.sendPhoto(chatId, amountChoiceImage, {
      caption: '스테이킹 수량을 선택 해주세요 &#x1F447;',
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
  }
});
