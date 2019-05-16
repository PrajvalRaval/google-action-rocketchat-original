
const envVariables = require('./config');

// Server URL Environment Variable

const { SERVER_URL } = envVariables;


// REST API Endpoints

module.exports = {
	loginUrl: `${ SERVER_URL }/api/v1/login`,
	createchannelurl: `${ SERVER_URL }/api/v1/channels.create`,
	deletechannelurl: `${ SERVER_URL }/api/v1/channels.delete`,
	postmessageurl: `${ SERVER_URL }/api/v1/chat.postMessage`,
	channelmessageurl: `${ SERVER_URL }/api/v1/channels.messages?roomName=`,
	channelinfourl: `${ SERVER_URL }/api/v1/channels.info?roomName=`,
	userinfourl: `${ SERVER_URL }/api/v1/users.info?username=`,
	addallurl: `${ SERVER_URL }/api/v1/channels.addAll`,
	makemoderatorurl: `${ SERVER_URL }/api/v1/channels.addModerator`,
	addownerurl: `${ SERVER_URL }/api/v1/channels.addOwner`,
	archivechannelurl: `${ SERVER_URL }/api/v1/channels.archive`,
	counterurl: `${ SERVER_URL }/api/v1/channels.counters?roomName=`,
};
