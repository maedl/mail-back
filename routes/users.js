var express = require('express');
var router = express.Router();

const fs = require('fs');

let mails = [];

router.get('/', function(req, res) {

  fs.readFile('mail.txt', 'utf-8', function(err, data) {
    if (err) {
      console.log(err);
    }

    let readData = data.split(', ');

    readData.forEach((mail) => {
      mails.push(mail);
    })

    res.json(mails);

  })
  
});


router.post('/add', function(req, res) {
  let reqData = req.body;

  let answer = {
    status: 'failed',
    message: ''
  }

  fs.readFile('mail.txt', 'utf-8', function(err, data) {
    if (err) {
      console.log(err);
    }

    let readData = data.split(', ');

    readData.forEach((mail) => {
      mails.push(mail);
    });

    for (let i = 0; i < mails.length; i++) {
      if (mails[i] == reqData.email) {
        answer.message = 'exists'
        res.json(answer);
        return;
      }
    }

    addMail(reqData.email);
    answer.status = 'success';
    answer.message = 'added';
    res.json(answer);
  })

});

function addMail(email) {

  let textToAdd = email + ', ';

  fs.appendFile('mail.txt', textToAdd, function(err) {
    if (err) {
      console.error(err);
    }
    else {
      console.log('successfully appended file');
    }
  })
}

module.exports = router;
