const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/layerpopup', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/register-popup.html'));
});

app.use('/', router);
app.listen(3000, () => console.log('Hello localhost:3000'));