const client = require('../redis/client');
const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    // redis client를 통해 저장된 'data'와 'krw' 값을 불러옴
    const data = await client.get('date');
    const krw = await client.get('krw');
    const statistics = {
      connecting: data,
      waiting: krw
    }
    
    console.log("statistics : ", statistics);

    // 응답
    res.status(200).json({
      status: 200,
      body: statistics
    });
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({
    status: 500,
    body: { message: err.message },
  });
})

module.exports = router;
