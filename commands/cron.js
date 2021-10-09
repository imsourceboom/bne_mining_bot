const shell = require('shelljs');
const schedule = require('node-schedule');
const { User, Amount, Profitability } = require('../models');
const { bot } = require('../app');
const { replyMarkupMainConfig, dashboardMessage } = require('./variables');
const { nextCycle } = require('../utils/nextCycle');
const { tonPrice } = require('../utils/tonPrice');

const cycleStart = shell.exec('bash getData.sh | awk "FNR == 1"').stdout;
const currentNow = Math.floor(+new Date() / 1000);
let since = parseInt(cycleStart) + 65536;
if (currentNow > since) {
  since += 65536;
}
let done = since + 600;

const serviceFee = 95;

const startTime = new Date(since * 1000).toString();
const endTime = new Date(done * 1000).toString();

schedule.scheduleJob(
  { start: startTime, end: endTime, rule: '*/10 * * * *' },
  () => {
    const cycleUpdate = () => {
      setInterval(async () => {
        const totalStake = shell.exec('bash shell.sh | awk "FNR == 2"').stdout;
        const totalReward = shell.exec('bash shell.sh | awk "FNR == 3"').stdout;
        // 사이클 채산성
        let increase =
          (parseInt(totalReward) / parseInt(totalStake)) * serviceFee;

        const amount = await Amount.findAll({
          attributes: ['total_reward', 'staking', 'owner'],
        });

        const result = amount.map((item, i) => {
          // 사이클 보상 수량
          const reward = ((item.dataValues.staking / 2) * increase) / 100;
          // 기존 수량 + 새로운 보상
          const plus = parseFloat(item.dataValues.total_reward) + reward;
          // 채굴 수익률
          const profitability = (plus / item.dataValues.staking) * 100;

          Amount.update(
            {
              total_reward: plus,
              previous_reward: reward,
            },
            {
              where: { owner: item.dataValues.owner },
            }
          );

          if (i == 0) {
            Profitability.update(
              {
                previous_profit: increase,
                total_profit: profitability,
              },
              {
                where: { id: 1 },
              }
            );
          }
        });
        cycleUpdate();
      }, 65536000);
    };

    schedule.scheduleJob('30 9 * * *', async () => {
      const users = await User.findAll({ attributes: ['user_id', 'id'] });
      const profitability = await Profitability.findOne({ where: { id: 1 } });
      const incomeStateGif =
        'https://postfiles.pstatic.net/MjAyMTAxMTBfMjEy/MDAxNjEwMjY2NTI4MTM3.tAPXyS_ElO7psB9TQeOMaIuP5BZI2Iiori96vSpXzZcg.ODJ7ltezspBCTbL4SBTZSXmgLASwFqnu__J5vRJIsuwg.GIF.freefutsal/ton.gif?type=w966';

      users.map((user) => {
        const userId = user.dataValues.user_id;
        const random = Math.floor(Math.random() * (60 - 1) + 1) * 1000;

        Amount.findOne({ where: { owner: user.dataValues.id } }).then(
          (info) => {
            const message = dashboardMessage(
              info.dataValues.staking,
              info.dataValues.total_reward,
              profitability.dataValues.total_profit,
              info.dataValues.previous_reward,
              profitability.dataValues.previous_profit,
              nextCycle(),
              await tonPrice(),
              profitability.dataValues.updatedAt
            );
            setTimeout(() => {
              bot.sendDocument(userId, incomeStateGif, {
                caption: message,
                parse_mode: 'HTML',
                reply_markup: replyMarkupMainConfig,
              });
            }, random);
          }
        );
      });
    });
  }
);