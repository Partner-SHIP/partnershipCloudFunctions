const test = require('firebase-functions-test')();
const functions = require('firebase-functions');
test.mockConfig({ stripe: { key: '23wr42ewr34' }});
const key = functions.config().stripe.key;
const myFunctions = require('../index.js');