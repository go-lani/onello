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

// app.delete(`http://localhost:3000/works/${id}`, (req, res) => {//id는 completed는 문자이기 때문에 숫자는 처리하지않는다.
//   const { id } = req.params; // req.params.id
//   works = works.filter((todo) => works.id !== +id);
//   res.send(works);
// });


app.use('/', router);

app.listen(4000, () => console.log('Hello localhost:4000'));