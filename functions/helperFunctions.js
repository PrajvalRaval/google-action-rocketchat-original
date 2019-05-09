
const axios = require('axios');
const apiEndpoints = require('./apiEndpoints');
const envVariables = require('./config');

const login = async () => {
    try {
      const { logindata } = await axios.post(apiEndpoints.loginUrl, {user: envVariables.username, password: envVariables.password});
      return logindata;
    } catch (loginerror) {
      console.error('cannot fetch quotes', loginerror);
    }
  };
  
  var headers = {
              'X-Auth-Token': envVariables.authtoken, 
              'X-User-Id': envVariables.userid
              };
  
  const createChannel = async (channelname) => {
    try {
      const { data } = await axios({
    method: 'post',
    url: apiEndpoints.createchannelurl,
    data: {
      name : channelname
    },
    headers: headers
  });
      return data;
    } catch (error) {
      console.error('cannot create channel', error);
      return error;
    }
  };
  
  const deleteChannel = async (channelname) => {
    try {
      const { data } = await axios({
    method: 'post',
    url: apiEndpoints.deletechannelurl,
    data: {
      roomName : channelname
    },
    headers: headers
  });
      return data;
    } catch (error) {
      console.error('cannot delete channel', error);
      return error;
    }
  };
  
  const postMessage = async (channelname,message) => {
    try {
      const { data } = await axios({
    method: 'post',
    url: apiEndpoints.postmessageurl,
    data: {
      channel : '#'+channelname,
      text: message
    },
    headers: headers
  });
      return data;
    } catch (error) {
      console.error('cannot post message', error);
      return error;
    }
  };
  
  const channelMessage = async (channelname) => {
    try {
      const { data } = await axios({
    method: 'get',
    url: apiEndpoints.channelmessageurl+channelname,
    headers: headers
  });
      return data;
    } catch (error) {
      console.error('cannot get channel message', error);
      return error;
    }
  };
  
  const getUserInfo = async (username) => {
    try {
      const { data } = await axios({
    method: 'get',
    url: apiEndpoints.userinfourl+username,
    headers: headers
  });
      return data;
    } catch (error) {
      console.error('cannot get channel message', error);
      return error;
    }
  };
  
  const getRoomInfo = async (channelname) => {
    try {
      const { data } = await axios({
    method: 'get',
    url: apiEndpoints.channelinfourl+channelname,
    headers: headers
  });
      return data;
    } catch (error) {
      console.error('cannot get channel message', error);
      return error;
    }
  };
  
  
  const addAll = async (roomid) => {
    try {
      const { data } = await axios({
    method: 'post',
    url: apiEndpoints.addallurl,
    data: {
      roomId : roomid
    },
    headers: headers
  });
      return data;
    } catch (error) {
      console.error('cannot add all', error);
      return error;
    }
  };
  
  const makeModerator = async (userid,roomid) => {
    try {
      const { data } = await axios({
    method: 'post',
    url: apiEndpoints.makemoderatorurl,
    data: {
      userId : userid,
      roomId : roomid
    },
    headers: headers
  });
      return data;
    } catch (error) {
      console.error('cannot make moderator', error);
      return error;
    }
  };
  
  const addOwner = async (userid,roomid) => {
    try {
      const { data } = await axios({
    method: 'post',
    url: apiEndpoints.addownerurl,
    data: {
      userId : userid,
      roomId : roomid
    },
    headers: headers
  });
      return data;
    } catch (error) {
      console.error('cannot make owner', error);
      return error;
    }
  };
  
  const archiveChannel = async (roomid) => {
    try {
      const { data } = await axios({
    method: 'post',
    url: apiEndpoints.archivechannelurl,
    data: {
      roomId : roomid
    },
    headers: headers
  });
      return data;
    } catch (error) {
      console.error('cannot archive channel', error);
      return error;
    }
  };

module.exports.login = login;
module.exports.createChannel = createChannel;
module.exports.deleteChannel = deleteChannel;
module.exports.postMessage = postMessage;
module.exports.getRoomInfo = getRoomInfo;
module.exports.getUserInfo = getUserInfo;
module.exports.channelMessage = channelMessage;
module.exports.makeModerator = makeModerator;
module.exports.addAll = addAll;
module.exports.addOwner = addOwner;
module.exports.archiveChannel = archiveChannel;