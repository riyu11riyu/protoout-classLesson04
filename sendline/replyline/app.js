'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '36887f5dbdd8006bf900bd1d5c1d9506',
    channelAccessToken: 'Flnz8PKi7L8BZUO4WHNFkFVqIJCnUUHNj5/PV2SoF8C2lZ4QSUOOHR+TPt8qm9lwTrPvXznweJewgDVCKeCHiScqiu73tHhD+1w1GamTdhJMHLW9BYdMGblEQxiMYQkm6tvOH5dp52zvDIQfeQeY5wdB04t89/1O/w1cDnyilFU='
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くてもBotは動く)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log('events', req.body.events);

    if(req.body.events.length === 0){
        res.send('Hello LINE BOT!(POST)');
        console.log('疎通確認用');
        return;
    }

    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.messagingApi.MessagingApiClient(config);

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

return client.replyMessage({
  replyToken: event.replyToken,
  messages: [{
    type: 'text',
    text: 'こんばんは'
  }]
});
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);
