exports.replyMarkupMainConfig = {
  keyboard: [['💎 수량 선택', '📜 수입 현황']],
  resize_keyboard: true,
  // one_time_keyboard: true,
  force_reply: true,
};

exports.startMessage = (username, chatId) => {
  let customer;
  if (username == undefined) {
    customer = chatId;
  } else {
    customer = username;
  }
  return `
<pre>&#x1F506;&#x1F506;&#x1F506;</pre>

<pre>👋🏻 안녕하세요!</pre> 
<pre><a href="tg://user?id=${chatId}">${customer}</a>님 반갑습니다!</pre>

<pre>BNE Main Miner 스테이킹 현황 봇을 이용해 주셔서 감사합니다</pre>

<pre>BNE Main Miner 봇은 고객님의 스테이킹 중인 TON의 예상 수입과 부가적인 정보들을 확인할 수 있으며 알림 또한 받을 수 있는 봇입니다</pre>

<pre>&#x1F506;&#x1F506;&#x1F506;</pre>
  `;
};

exports.amountMessage = (amount, totalReward, totalProfit) => {
  let value;
  if (amount == 12000) {
    value = '12,000';
  } else {
    value = '13,000';
  }
  return `
&#128640;&#128640;&#128640; <b> 스테이킹 현황 </b> &#128640;&#128640;&#128640;

<b>스테이킹 시작 - 만료</b>
&#128198; 2020년 12월 11일 - 2021년 12월 11일

<b>채굴원본</b>
&#128142; ${value} TON

<b>Mining asset 잔액</b>
&#128142; ${totalReward} TON

<b>누적 채굴 수익률</b>
&#128200; ${totalProfit} %
`;
};

exports.dashboardMessage = (
  amount,
  totalReward,
  totalProfit,
  previousReward,
  previousProfit,
  nextCycle,
  tonPrice,
  lastUpdate
) => {
  let value;
  if (amount == 12000) {
    value = '12,000';
  } else {
    value = '13,000';
  }
  return `
&#128640;&#128640;&#128640; <b> 스테이킹 현황 </b> &#128640;&#128640;&#128640;

<b>스테이킹 시작 - 만료</b>
&#128198; 2020년 12월 11일 - 2021년 12월 11일

<b>채굴원본</b>
&#128142; ${value} TON

<b>Mining asset 잔액</b>
&#128142; ${totalReward} TON

<b>누적 채굴 수익률</b>
&#128200; ${totalProfit} %

<b>전 사이클 보상 수량</b>
&#128142; ${previousReward} TON

<b>전 사이클 채굴 수익률</b>
&#128200; ${previousProfit} %

<b>다음 사이클 시작 ~ 만료</b>
&#128198; ${nextCycle}

<b>TON 가격</b> - (출처 Coingecko)
&#8361; ${tonPrice}

<b>마지막 업데이트</b>
&#128260; ${lastUpdate}
`;
};
