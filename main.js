/**
 * This is the main file of Pokémon Showdown Bot
 *
 * Some parts of this code are taken from the Pokémon Showdown server code, so
 * credits also go to Guangcong Luo and other Pokémon Showdown contributors.
 * https://github.com/Zarel/Pokemon-Showdown
 *
 * @license MIT license
 */

global.info = function (text) {
	if (config.debuglevel > 3) return;
	if (!colors) global.colors = require('colors');
	console.log('info'.cyan + '  ' + text);
};

global.debug = function (text) {
	if (config.debuglevel > 2) return;
	if (!colors) global.colors = require('colors');
	console.log('debug'.blue + ' ' + text);
};

global.recv = function (text) {
	if (config.debuglevel > 0) return;
	if (!colors) global.colors = require('colors');
	console.log('recv'.grey + '  ' + text);
};

global.cmdr = function (text) { // receiving commands
	if (config.debuglevel !== 1) return;
	if (!colors) global.colors = require('colors');
	console.log('cmdr'.grey + '  ' + text);
};

global.dsend = function (text) {
	if (config.debuglevel > 1) return;
	if (!colors) global.colors = require('colors');
	console.log('send'.grey + '  ' + text);
};

global.error = function (text) {
	if (!colors) global.colors = require('colors');
	console.log('error'.red + ' ' + text);
};

global.ok = function (text) {
	if (config.debuglevel > 4) return;
	if (!colors) global.colors = require('colors');
	console.log('ok'.green + '    ' + text);
};

global.toId = function (text) {
	return text.toLowerCase().replace(/[^a-z0-9]/g, '');
};

global.stripCommands = function (text) {
	return ((text.trim().charAt(0) === '/') ? '/' : ((text.trim().charAt(0) === '!') ? ' ' : '')) + text.trim();
};

global.send = function (connection, data) {
	if (connection.connected) {
		if (!(data instanceof Array)) {
			data = [data.toString()];
		}
		data = JSON.stringify(data);
		dsend(data);
		connection.send(data);
	}
};

function runNpm(command) {
	command = 'npm ' + command + ' && ' + process.execPath + ' app.js';
	console.log('Running `' + command + '`...');
	require('child_process').spawn('sh', ['-c', command], {stdio: 'inherit', detached: true});
	process.exit(0);
}

try {
	require('sugar');
	require('colors');
} catch (e) {
	runNpm('install');
}
if (!Object.select) {
	runNpm('update');
}

// First dependencies and welcome message
var sys = require('sys');
global.colors = require('colors');

console.log('------------------------------------'.yellow);
console.log('| Welcome to Pokemon Showdown Bot! |'.yellow);
console.log('------------------------------------'.yellow);
console.log('');

// Config and config.js watching...
global.fs = require('fs');
if (!('existsSync' in fs)) {
	fs.existsSync = require('path').existsSync;
}

if (!fs.existsSync('./config/config.js')) {
	error('config/config.js doesn\'t exist; are you sure you copied config-example.js to config.js?');
	process.exit(-1);
}

global.config = require('./config/config.js');
global.cleanChatData = function (chatData) {
	for (var user in chatData) {
		for (var room in chatData[user]) {
			if (!chatData[user][room].times || !chatData[user][room].times.length) {
				delete chatData[user][room];
				continue;
			}
			var newTimes = [];
			var now = Date.now();
			for (var i in chatData[user][room].times) {
				if ((now - chatData[user][room].times[i]) < 5 * 1000) newTimes.push(chatData[user][room].times[i]);
			}
			newTimes.sort();
			chatData[user][room].times = newTimes;
			if (chatData[user][room].points > 0 && chatData[user][room].points < 4) chatData[user][room].points--;
		}
	}
	return chatData;
};

var checkCommandCharacter = function () {
	if (!/[^a-z0-9 ]/i.test(config.commandcharacter)) {
		error('invalid command character; should at least contain one non-alphanumeric character');
		process.exit(-1);
	}
};

checkCommandCharacter();

var watchFile = function () {
	try {
		return fs.watchFile.apply(fs, arguments);
	} catch (e) {
		error('your version of node does not support `fs.watchFile`');
	}
};

if (config.watchconfig) {
	watchFile('./config/config.js', function (curr, prev) {
		if (curr.mtime <= prev.mtime) return;
		try {
			delete require.cache[require.resolve('./config/config.js')];
			global.config = require('./config/config.js');
			info('reloaded config.js');
			checkCommandCharacter();
		} catch (e) {}
	});
}

// And now comes the real stuff...
info('starting server');

var WebSocketClient = require('websocket').client;
global.Commands = require('./commands.js').commands;
global.Parse = require('./parser.js').parse;

var connect = function (retry) {
	if (retry) {
		info('retrying...');
	}

	var ws = new WebSocketClient();

	ws.on('connectFailed', function (err) {
		error('Could not connect to server ' + config.server + ': ' + sys.inspect(err));
		info('retrying in one minute');

		setTimeout(function () {
			connect(true);
		}, 60000);
	});

	ws.on('connect', function (connection) {
		ok('connected to server ' + config.server);

		connection.on('error', function (err) {
			error('connection error: ' + sys.inspect(err));
		});

		connection.on('close', function () {
			// Is this always error or can this be intended...?
			error('connection closed: ' + sys.inspect(arguments));
			info('retrying in one minute');

			setTimeout(function () {
				connect(true);
			}, 60000);
		});

		connection.on('message', function (message) {
			if (message.type === 'utf8') {
				recv(sys.inspect(message.utf8Data));
				Parse.data(message.utf8Data, connection);
			}
		});
	});

	// The connection itself
	var id = ~~(Math.random() * 900) + 100;
	var chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
	var str = '';
	for (var i = 0, l = chars.length; i < 8; i++) {
		str += chars.charAt(~~(Math.random() * l));
	}

	var conStr = 'ws://' + config.server + ':' + config.port + '/showdown/' + id + '/' + str + '/websocket';
	info('connecting to ' + conStr + ' - secondary protocols: ' + sys.inspect(config.secprotocols));
	ws.connect(conStr, config.secprotocols);
};

connect();
