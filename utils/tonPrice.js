const axios = require('axios');

exports.tonPrice = async () => {
  const coinGecko = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price?ids=ton-crystal&vs_currencies=krw'
  );
  const price = coinGecko.data['ton-crystal']['krw'];
  return price;
};
