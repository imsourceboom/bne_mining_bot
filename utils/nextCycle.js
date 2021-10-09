const shell = require('shelljs');
const { dateFormat } = require('./dateFormat');

exports.nextCycle = () => {
  const cycleStart = shell.exec('bash ../ssh.sh | tail -n 3 | awk "FNR == 1"');
  // const cycleStart = shell.exec('bash getData.sh | awk "FNR == 1"').stdout;
  const currentNow = Math.floor(+new Date() / 1000);
  let since = parseInt(cycleStart) + 65536;
  if (currentNow > since) {
    since += 65536;
  }
  let done = since + 65536;

  const nextCycleStart = dateFormat(new Date(since * 1000));
  const nextCycleEnd = dateFormat(new Date(done * 1000));
  return `${nextCycleStart} ~ ${nextCycleEnd}`;
};
