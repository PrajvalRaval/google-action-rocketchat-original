
'use strict';

const {
  dialogflow
} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({debug: true});
const helperFunctions = require('./helperFunctions');


app.intent('Default Welcome Intent', (conv) => {
  conv.ask("Welcome To Rocket Chat Google Action. What would you like to do today? ");
});


app.intent('Create Channel Intent', async (conv, params) => {

  var channelname = params.channelname;
  const login = await helperFunctions.login();
  const functiondata = await helperFunctions.createChannel(channelname);
  
  conv.ask(`Creating Channel ${functiondata.success}`);

});

app.intent('Delete Channel Intent', async (conv, params) => {

  var channelname = params.channelname;
  const login = await helperFunctions.login();
  const functiondata = await helperFunctions.deleteChannel(channelname);
  
  conv.ask(`Deleting Channel ${functiondata.success}`);
});

app.intent('Post Message Intent', async (conv, params) => {

  var channelname = params.channelname;
  var message = params.message;
  const login = await helperFunctions.login();
  const functiondata = await helperFunctions.postMessage(channelname, message);
  
  conv.ask(`Posting Message ${functiondata.success}`);
});

app.intent('Channel Last Message Intent', async (conv, params) => {

  var channelname = params.channelname;
  const login = await helperFunctions.login();
  const functiondata = await helperFunctions.channelMessage(channelname);
  
  conv.ask(`${functiondata.messages[0].u.username} says, ${functiondata.messages[0].msg} `);
});

app.intent('Make Moderator Intent', async (conv, params) => {

  var channelname = params.channelname;
  var username = params.username;
  const login = await helperFunctions.login();
  const userinfo = await helperFunctions.getUserInfo(username);
  const userid = userinfo.user._id;
  const roominfo = await helperFunctions.getRoomInfo(channelname);
  const roomid = roominfo.channel._id;
  const functiondata = await helperFunctions.makeModerator(userid,roomid);
  
  conv.ask(`Make Moderator ${functiondata.success}`);
});

app.intent('Add Channel Owner Intent', async (conv, params) => {

  var channelname = params.channelname;
  var username = params.username;
  const login = await helperFunctions.login();
  const userinfo = await helperFunctions.getUserInfo(username);
  const userid = userinfo.user._id;
  const roominfo = await helperFunctions.getRoomInfo(channelname);
  const roomid = roominfo.channel._id;
  const functiondata = await helperFunctions.addOwner(userid,roomid);

  conv.ask(`Make Owner ${functiondata.success}`);

});

app.intent('Add All To Channel Intent', async (conv, params) => {

  var channelname = params.channelname;
  const login = await helperFunctions.login();
  const roominfo = await helperFunctions.getRoomInfo(channelname);
  const roomid = roominfo.channel._id;
  const functiondata = await helperFunctions.addAll(roomid);
  
  conv.ask(`Adding All ${functiondata.success}`);
});

app.intent('Archive Channel Intent', async (conv, params) => {

  var channelname = params.channelname;
  const login = await helperFunctions.login();
  const roominfo = await helperFunctions.getRoomInfo(channelname);
  const roomid = roominfo.channel._id;
  const functiondata = await helperFunctions.archiveChannel(roomid);
  
  conv.ask(`Archive Channel ${functiondata.success}`);
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
