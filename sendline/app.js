'use strict';

const line = require('@line/bot-sdk');

const config = {
    channelSecret: '',
    channelAccessToken: 'Flnz8PKi7L8BZUO4WHNFkFVqIJCnUUHNj5/PV2SoF8C2lZ4QSUOOHR+TPt8qm9lwTrPvXznweJewgDVCKeCHiScqiu73tHhD+1w1GamTdhJMHLW9BYdMGblEQxiMYQkm6tvOH5dp52zvDIQfeQeY5wdB04t89/1O/w1cDnyilFU='
};
const client = new line.messagingApi.MessagingApiClient(config);

const main = async () => {

    const messages = [{
        type: 'text',
        text: 'うい！'
    }];

    try {
        const res = await client.broadcast({ messages });
        console.log(res);
    } catch (error) {
        console.log(`エラー: ${error.statusMessage}`);
        console.log(error.originalError.response.data);
    }
}

main();