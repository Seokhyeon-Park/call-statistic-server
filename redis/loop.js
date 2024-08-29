const client = require('./connector');

// API 호출
const putRedis = async () => {
  try {
    const target = 'https://latest.currency-api.pages.dev/v1/currencies/usd.json';
    const response = await fetch(target);

    if (!response.ok) { throw new Error('network Error'); }

    const data = await response.json();

    await client.set('date', data.date);
    await client.set('krw', data.usd.krw);

    console.log(await client.get('date'));
    console.log(await client.get('krw'));
  } catch (error) {
    console.log('putRedis error : ', error);
  }
}

setInterval(putRedis, 5000);