const client = require('./client');

// API 호출
const putRedis = async () => {
  try {
    const target = 'https://latest.currency-api.pages.dev/v1/currencies/usd.json';
    const response = await fetch(target);

    if (!response.ok) { throw new Error('network Error'); }

    // API를 통해 불러온 값
    const data = await response.json();

    // redis client에 data를 저장(set)
    await client.set('date', data.date);
    await client.set('krw', data.usd.krw);

    // console.log(await client.get('date'));
    // console.log(await client.get('krw'));
  } catch (error) {
    console.log('putRedis error : ', error);
  }
}

setInterval(putRedis, 5000);