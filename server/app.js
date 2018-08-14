require('dotenv').config({ silent: true })
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
var pdf = require('html-pdf');

const app = express();

tags = [
  {key: 'staddr', title: 'St. Address', tag: '<span id="staddr">@@St.Addr.@@</span>', type: 'text', value: ''},
  {key: 'city', title: 'City', tag: '<span id="city">@@city@@</span>', type: 'select',
    options: [
      'Manchester',
      'Hartford',
      'New Haven',
      'Boston',
      'New York'
    ], value: ''
  },
  {key: 'state', title: 'State', tag: '<span id="state">@@State@@</span>', type: 'select',
    options: [
      'CT',
      'MA',
      'WY',
      'NY',
      'ID'
    ], value: ''
  },
  {key: 'zipcode', title: 'Zip Code', tag: '<span id="zipcode">@@Zip Code@@</span>', type: 'text', value: ''},
  {key: 'telnum', title : 'Tel. Number', tag: '<span id="telnum">@@Tel. Number@@</span>', type: 'text', value: '' },
  {key: 'email', title : 'Email Addr.', tag: '<span id="email">@@Email Addr.@@</span>', type: 'text', value: ''},
  {key: 'title', title : 'Title', tag: '<span id="title">@@Title@@</span>', type: 'text', value: ''},
  {key: 'para', title : 'Paragraph', tag: '< span id="para">@@Paragraph@@</span>', type: 'textarea', value: ''}
];

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
    res.send(JSON.stringify({'data': 'Data Saved'}));
  });
});
app.get('/api/data/template', (req, res, next) => {
  res.send(fs.readFileSync('data_templated.mht'))
});
app.post('/api/data/final', (req, res, next) => {
  fs.writeFile('data_final.mht', req.body.body, function() {
    pdf.create(req.body.pdfData, { format: 'Letter' }).toFile('data.pdf', 
      function(err, res) {
        if (err) return console.log(err);
        console.log(res); 
      }); 
    });
    res.send(JSON.stringify({'data': 'PDF Saved'})); 
});
app.get('/api/data/final', (req, res, next) => {
  res.download('data.pdf', 'data.pdf');
});

app.get('/api/tags', (req, res, next) => {
  res.send(JSON.stringify(tags));
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error('Unable to listen for connection', err);
    process.exit(0);
  }
  console.log(`express ${process.env.NODE_ENV} server is listening on port ${process.env.PORT}`);
})
