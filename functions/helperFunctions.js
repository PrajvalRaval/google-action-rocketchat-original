
const axios = require('axios');
const apiEndpoints = require('./apiEndpoints');
const envVariables = require('./config');

const removeWhitespace = require('remove-whitespace'); 
const emojiTranslate = require('moji-translate');

const i18n = require('i18n');

// Server Credentials. Follow readme to set them up.
const { OAUTH_SERVICE_NAME } = envVariables;

const login = async (accessToken) =>
	await axios
		.post(apiEndpoints.loginUrl, {
			serviceName: OAUTH_SERVICE_NAME,
			accessToken,
			expiresIn: 200,
		})
		.then((res) => res.data)
		.then((res) => {
			console.log(res);
			const headers = {
				'X-Auth-Token': res.data.authToken,
				'X-User-Id': res.data.userId,
			};
			return headers;
		})
		.catch((err) => {
			console.log(err);
		});

const createChannel = async (channelName, headers) =>
	await axios
		.post(
			apiEndpoints.createchannelurl,
			{
				name: channelName,
			},
			{ headers }
		)
		.then((res) => res.data)
		.then((res) => {
			if (res.success === true) {
				return i18n.__('CREATE_CHANNEL.SUCCESS',channelName);
			} else {
				return i18n.__('CREATE_CHANNEL.ERROR',channelName);
			}
		})
		.catch((err) => {
			console.log(err.message);
			if (err.response.data.errorType === 'error-duplicate-channel-name') {
				return i18n.__('CREATE_CHANNEL.ERROR_DUPLICATE_NAME',channelName);
			} 
			else if (err.response.data.errorType === 'error-invalid-room-name') {
				return i18n.__('CREATE_CHANNEL.ERROR_INVALID_NAME',channelName);
			} else {
				return i18n.__('CREATE_CHANNEL.ERROR',channelName);
			}
		});

const deleteChannel = async (channelName, headers) =>
	await axios
		.post(
			apiEndpoints.deletechannelurl,
			{
				roomName: channelName,
			},
			{ headers }
		)
		.then((res) => res.data)
		.then((res) => {
			if (res.success === true) {
				return i18n.__('DELETE_CHANNEL.SUCCESS',channelName);
			} else {
				return i18n.__('DELETE_CHANNEL.ERROR',channelName);
			}
		})
		.catch((err) => {
			console.log(err.message);
			if (err.response.data.errorType === 'error-room-not-found') {
				return i18n.__('DELETE_CHANNEL.ERROR_NOT_FOUND',channelName);
			} else {
				return i18n.__('DELETE_CHANNEL.ERROR',channelName);
			}
		});

const postMessage = async (channelName, message, headers) =>
	await axios
		.post(
			apiEndpoints.postmessageurl,
			{
				channel: `#${ channelName }`,
				text: message,
			},
			{ headers }
		)
		.then((res) => res.data)
		.then((res) => {
			if (res.success === true) {
				return i18n.__('POST_MESSAGE.SUCCESS');
			} else {
				return i18n.__('POST_MESSAGE.ERROR');
			}
		})
		.catch((err) => {
			console.log(err.message);
			return i18n.__('POST_MESSAGE.ERROR');
		});

const channelLastMessage = async (channelName, headers) =>
	await axios
		.get(`${ apiEndpoints.channelmessageurl }${ channelName }`, { headers })
		.then((res) => res.data)
		.then((res) => {
			if (res.success === true) {
				return i18n.__('GET_LAST_MESSAGE_FROM_CHANNEL.SUCCESS',name=res.messages[0].u.username,message=res.messages[0].msg,);
			} else {
				return i18n.__('GET_LAST_MESSAGE_FROM_CHANNEL.ERROR',channelName);
			}
		})
		.catch((err) => {
			console.log(err.message);
			if (err.response.data.errorType === 'error-room-not-found') {
				return i18n.__('GET_LAST_MESSAGE_FROM_CHANNEL.ERROR_NOT_FOUND',channelName);
			} else {
				return i18n.__('GET_LAST_MESSAGE_FROM_CHANNEL.ERROR',channelName);
			}
		});

const getUserId = async (userName, headers) =>
	await axios
		.get(`${ apiEndpoints.userinfourl }${ userName }`, { headers })
		.then((res) => res.data)
		.then((res) => `${ res.user._id }`)
		.catch((err) => {
			console.log(err.message);
		});

const getRoomId = async (channelName, headers) =>
	await axios
		.get(`${ apiEndpoints.channelinfourl }${ channelName }`, { headers })
		.then((res) => res.data)
		.then((res) => `${ res.channel._id }`)
		.catch((err) => {
			console.log(err.message);
		});

const makeModerator = async (userName, channelName, userid, roomid, headers) =>
	await axios
		.post(
			apiEndpoints.makemoderatorurl,
			{
				userId: userid,
				roomId: roomid,
			},
			{ headers }
		)
		.then((res) => res.data)
		.then((res) => {
			if (res.success === true) {
				return i18n.__('MAKE_MODERATOR.SUCCESS',userName,channelName);
			} else {
				return i18n.__('MAKE_MODERATOR.ERROR');
			}
		})
		.catch((err) => {
			console.log(err.message);
			return i18n.__('MAKE_MODERATOR.ERROR_NOT_FOUND',channelName);
		});

const addAll = async (channelName, roomid, headers) =>
	await axios
		.post(
			apiEndpoints.addallurl,
			{
				roomId: roomid,
			},
			{ headers }
		)
		.then((res) => res.data)
		.then((res) => {
			if (res.success === true) {
				return i18n.__('ADD_ALL_TO_CHANNEL.SUCCESS',channelName);
			} else {
				return i18n.__('ADD_ALL_TO_CHANNEL.ERROR');
			}
		})
		.catch((err) => {
			console.log(err.message);
			return i18n.__('ADD_ALL_TO_CHANNEL.ERROR_NOT_FOUND',channelName);
		});

const addOwner = async (userName, channelName, userid, roomid, headers) =>
	await axios
		.post(
			apiEndpoints.addownerurl,
			{
				userId: userid,
				roomId: roomid,
			},
			{ headers }
		)
		.then((res) => res.data)
		.then((res) => {
			if (res.success === true) {
				return i18n.__('ADD_OWNER.SUCCESS',userName, channelName);
			} else {
				return i18n.__('ADD_OWNER.ERROR');
			}
		})
		.catch((err) => {
			console.log(err.message);
			return i18n.__('ADD_OWNER.ERROR_NOT_FOUND',channelName);
		});

const archiveChannel = async (channelName, roomid, headers) =>
	await axios
		.post(
			apiEndpoints.archivechannelurl,
			{
				roomId: roomid,
			},
			{ headers }
		)
		.then((res) => res.data)
		.then((res) => {
			if (res.success === true) {
				return i18n.__('ARCHIVE_CHANNEL.SUCCESS',channelName);
			} else {
				return i18n.__('ARCHIVE_CHANNEL.ERROR');
			}
		})
		.catch((err) => {
			console.log(err.message);
			return i18n.__('ARCHIVE_CHANNEL.ERROR_NOT_FOUND',channelName);
		});

function replaceWhitespacesFunc(str){
	return removeWhitespace(str);
}

function replaceWhitespacesDots(str){
	return str.replace(/\s/ig, '.');
}

function emojiTranslateFunc(str){
	onlyEmoji = true;
	return emojiTranslate.translate(str, onlyEmoji);
}

// Module Export of Functions

module.exports.login = login;
module.exports.createChannel = createChannel;
module.exports.deleteChannel = deleteChannel;
module.exports.postMessage = postMessage;
module.exports.channelLastMessage = channelLastMessage;
module.exports.getUserId = getUserId;
module.exports.getRoomId = getRoomId;
module.exports.makeModerator = makeModerator;
module.exports.addAll = addAll;
module.exports.addOwner = addOwner;
module.exports.archiveChannel = archiveChannel;
module.exports.replaceWhitespacesFunc = replaceWhitespacesFunc;
module.exports.replaceWhitespacesDots = replaceWhitespacesDots;
module.exports.emojiTranslateFunc = emojiTranslateFunc;
