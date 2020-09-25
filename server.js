const express = require('express')
const app = express()

app.get('/api/info', (req, res) => {
  res.json({
    code: 0,
    data: ['hello', 'world'],
    message: 'ok',
  })
})

app.listen(9000)