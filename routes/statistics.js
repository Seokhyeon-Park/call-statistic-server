const client = require('../redis/connector');
const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const data = await client.get('date');
    const krw = await client.get('krw');
    const statistics = {
      connecting: data,
      waiting: krw
    }
    
    console.log("statistics : ", statistics);

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
