const { User, Amount, Profitability } = require('../models');
const { bot } = require('../app');
const { replyMarkupMainConfig, dashboardMessage } = require('./variables');
const { nextCycle } = require('../utils/nextCycle');
const { tonPrice } = require('../utils/tonPrice');

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  const incomeStateGif =
    'https://postfiles.pstatic.net/MjAyMTAxMTBfMjEy/MDAxNjEwMjY2NTI4MTM3.tAPXyS_ElO7psB9TQeOMaIuP5BZI2Iiori96vSpXzZcg.ODJ7ltezspBCTbL4SBTZSXmgLASwFqnu__J5vRJIsuwg.GIF.freefutsal/ton.gif?type=w966';

  if (msg.text == '📜 수입 현황') {
    const user = await User.findOne({ where: { user_id: chatId } });
    const stakingOwner = await Amount.findOne({
      where: { owner: user.dataValues.id },
    });
    const profitability = await Profitability.findOne({ where: { id: 1 } });
    const nextCycleInfo = nextCycle();
    const price = await tonPrice();

    const staking = stakingOwner.dataValues.staking;
    const rewardAmount =
      (staking * profitability.dataValues.total_profit) / 100;
    const miningAssetAmount = parseFloat(rewardAmount).toFixed(4);

    const message = dashboardMessage(
      staking,
      miningAssetAmount,
      profitability.dataValues.total_profit,
      stakingOwner.dataValues.previous_reward,
      profitability.dataValues.previous_profit,
      nextCycleInfo,
      price,
      profitability.dataValues.updatedAt
    );

    bot.sendDocument(chatId, incomeStateGif, {
      caption: message,
      parse_mode: 'HTML',
      reply_markup: replyMarkupMainConfig,
    });
  }
});
