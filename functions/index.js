'use strict';

const {
  dialogflow,
  SignIn
} = require('actions-on-google');
const functions = require('firebase-functions');

const helperFunctions = require('./helperFunctions');
const envVariables = require('./config');
const { CLIENT_ID } = envVariables;

const app = dialogflow({debug: true, clientId: CLIENT_ID });

const i18n = require('i18n');
const moment = require('moment');

i18n.configure({
  locales: ['en-US', 'pt-BR', 'hi-IN'],
  directory: __dirname + '/locales',
  defaultLocale: 'en-US',
  objectNotation : true
});

app.middleware((conv) => {
  i18n.setLocale(conv.user.locale);
  moment.locale(conv.user.locale);
});

// Intent that starts the account linking flow.
app.intent('Start Signin', (conv) => {
  conv.ask(new SignIn('To get your account details'));
});

app.intent('Default Welcome Intent', (conv) => {

    conv.ask(i18n.__('WELCOME.SUCCESS'));

});

app.intent('Create Channel Intent', async (conv, params) => {

    var accessToken = conv.user.access.token;
    var channelNameData = params.channelname;
    var channelName = helperFunctions.replaceWhitespacesFunc(channelNameData);
    
    const headers = await helperFunctions.login(accessToken);
    const speechText = await helperFunctions.createChannel(channelName,headers);
  
    conv.ask(speechText);

});

app.intent('Delete Channel Intent', async (conv, params) => {

    var accessToken = conv.user.access.token;
    var channelNameData = params.channelname;
    var channelName = helperFunctions.replaceWhitespacesFunc(channelNameData);

    const headers = await helperFunctions.login(accessToken);
    const speechText = await helperFunctions.deleteChannel(channelName,headers);
  
    conv.ask(speechText);

});

app.intent('Post Message Intent', async (conv, params) => {

    var accessToken = conv.user.access.token;
    var message = params.message;
    var channelNameData = params.channelname;
    var channelName = helperFunctions.replaceWhitespacesFunc(channelNameData);

    const headers = await helperFunctions.login(accessToken);
    const speechText = await helperFunctions.postMessage(channelName,message,headers);

    conv.ask(speechText);

});

app.intent('Channel Last Message Intent', async (conv, params) => {

  var accessToken = conv.user.access.token;
  var channelNameData = params.channelname;
  var channelName = helperFunctions.replaceWhitespacesFunc(channelNameData);

  const headers = await helperFunctions.login(accessToken);
  const speechText = await helperFunctions.channelLastMessage(channelName,headers);

  conv.ask(speechText);

});

app.intent('Make Moderator Intent', async (conv, params) => {

  var accessToken = conv.user.access.token;
  var userNameData = params.username;
  var userName = helperFunctions.replaceWhitespacesDots(userNameData);
  var channelNameData = params.channelname;
  var channelName = helperFunctions.replaceWhitespacesFunc(channelNameData);
  
  const headers = await helperFunctions.login(accessToken);
  const userid = await helperFunctions.getUserId(userName, headers);
  const roomid = await helperFunctions.getRoomId(channelName, headers);
  const speechText = await helperFunctions.makeModerator(userName,channelName,headers,userid,roomid);

  conv.ask(speechText);
  
});

app.intent('Add Channel Owner Intent', async (conv, params) => {

  var accessToken = conv.user.access.token;
  var userNameData = params.username;
  var userName = helperFunctions.replaceWhitespacesDots(userNameData);
  var channelNameData = params.channelname;
  var channelName = helperFunctions.replaceWhitespacesFunc(channelNameData);
  
  const headers = await helperFunctions.login(accessToken);
  const userid = await helperFunctions.getUserId(userName, headers);
  const roomid = await helperFunctions.getRoomId(channelName, headers);
  const speechText = await helperFunctions.addOwner(userName,channelName,userid,roomid,headers);

  conv.ask(speechText);

});

app.intent('Add All To Channel Intent', async (conv, params) => {

  var accessToken = conv.user.access.token;
  var channelNameData = params.channelname;
  var channelName = helperFunctions.replaceWhitespacesFunc(channelNameData);
  
  const headers = await helperFunctions.login(accessToken);
  const roomid = await helperFunctions.getRoomId(channelName, headers);
  const speechText = await helperFunctions.addAll(channelName,roomid,headers);

  conv.ask(speechText);
});

app.intent('Archive Channel Intent', async (conv, params) => {

  var accessToken = conv.user.access.token;
  var channelNameData = params.channelname;
  var channelName = helperFunctions.replaceWhitespacesFunc(channelNameData);
  
  const headers = await helperFunctions.login(accessToken);
  const roomid = await helperFunctions.getRoomId(channelName, headers);
  const speechText = await helperFunctions.archiveChannel(channelName,roomid,headers);

  conv.ask(speechText);

});




exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
