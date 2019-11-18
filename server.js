const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/layerpopup', (req, res) => {
  // res.sendFile(path.join(__dirname+'/public/register-popup.html'));
});

app.use('/', router);
<<<<<<< HEAD
app.listen(4000, () => console.log('Hello localhost:4000'));
=======

app.listen(3000, () => console.log('Hello localhost:3000'));
>>>>>>> b8b7c5cde5c736ac3b65077a1159eeb38be771c7
