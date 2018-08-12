require('dotenv').config({ silent: true })
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.set('json spaces', 2)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(bodyParser.json())

app.get('/api/data', (req, res, next) => {
  res.send(fs.readFileSync('data.mht', 'utf-8'))
});
app.post('/api/data', (req, res, next) => {
  fs.writeFile('data_templated.mht', req.body.body, function() {
    res.send('Data Saved')
  });
})
app.get('/api/data/template', (req, res, next) => {
  res.send(fs.readFileSync('data_templated.mht'))
});
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error('Unable to listen for connection', err);
    process.exit(0);
  }
  console.log(`express ${process.env.NODE_ENV} server is listening on port ${process.env.PORT}`);
})
