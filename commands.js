﻿/**
 * This is the file where the bot commands are located
 *
 * @license MIT license
 */

var http = require('http');
var sys = require('sys');

exports.commands = {
	/**
	 * Help commands
	 *
	 * These commands are here to provide information about the bot.
	 */

	about: function (arg, by, room, con) {
		var text;
		if (this.hasRank(by, '#~') || room.charAt(0) === ',') {
			text = '';
		} else {
			text = '/pm ' + by + ', ';
		}
		text += '**Pokémon Showdown Bot** by: Quinella and TalkTakesTime, modified by Freigeist';
		this.say(con, room, text);
	},
	help: 'guide',
	guide: function (arg, by, room, con) {
		var text;
		if (this.hasRank(by, '#~') || room.charAt(0) === ',') {
			text = '';
		} else {
			text = '/pm ' + by + ', ';
		}
		if (config.botguide) {
			text += 'A guide on how to use this bot can be found here: ' + config.botguide;
		} else {
			text += 'There is no guide for this bot. PM the owner with any questions.';
		}
		this.say(con, room, text);
	},
	git: function (arg, by, room, con) {
		var text;
		if (this.canUse('git', room, by) || room.charAt(0) === ',') {
			text = '';
		} else {
			text = '/pm ' + by + ', ';
		}
		text += 'The source of this Bot is available at https://github.com/Freigeist/Pokemon-Showdown-Bot';
		this.say(con, room, text);
	},
	orascalc: function (arg, by, room, con) {
		var text;
		if (this.canUse('git', room, by) || room.charAt(0) === ',') {
			text = '';
		} else {
			text = '/pm ' + by + ', ';
		}
		text += 'http://gamut-was-taken.github.io';
		this.say(con, room, text);
	},
	faq: function (arg, by, room, con) {
		var prefix;
		if (this.canUse('faq', room, by) || room.charAt(0) === ',') {
			prefix = '';
		} else {
			prefix = '/pm ' + by + ', ';
		}
		arg = toId(arg);
		if (!arg) return false;
		switch (arg) {
			case "voice":
				this.say(con, room, prefix + 'Q: **Wie werde ich Voice?**');
				this.say(con, room, prefix + 'A: http://ps-deutsche.forumieren.com/t544-wie-werde-ich-raumvoice#3166');
				break;
			case "rr":
			case "roundrobin":
				this.say(con, room, prefix + 'Q: **Was ist Round Robin?**');
				this.say(con, room, prefix + 'A: "Round Robin" ist ein Turnierformat, bei dem jeder Teilnehmer gegen jeden anderen Teilnehmer kämpfen muss. Der Sieger wird dann anhand der insgesamt gewonnenen Spiele ermittelt.');
				break;
			case "de":
			case "doubleelimination":
				this.say(con, room, prefix + 'Q: **Was ist Double Elimination?**');
				this.say(con, room, prefix + 'A: "Double Elimination" ist ein Turnierformat, bei dem man zweimal verlieren muss um auszuscheiden. Nach der ersten Niederlage kommt man in die Verlierer-Brackets. Wenn beim Finale der Spieler aus dem Verlierer-Bracket gewinnt, gibt es ein zweites Finale.');
				break;
			case "se":
			case "singleelimination":
				this.say(con, room, prefix + 'Q: **Was ist Single Elimination?**');
				this.say(con, room, prefix + 'A: "Single Elimination" ist ein Turnierformat, bei dem man nach einer Niederlage ausscheidet.');
				break;
			case "cc1v1":
			case "cc1vs1":
			case "challengecup1vs1":
				this.say(con, room, prefix + 'Q: **Was ist Challenge Cup 1-vs-1?**');
				this.say(con, room, prefix + 'A: Bei "Challenge Cup 1-vs-1" bekommt man zu Beginn des Kampfes 6 Pokémon, deren Attacken, Fähigkeiten etc. zufällig, aber legal sind. Anschließend wählt man eines dieser Pokémon aus und kämpft mit diesem einen gegen das vom Gegner ausgewählte Pokémon.');
				break;
			case "cc":
			case "challengecup":
				this.say(con, room, prefix + 'Q: **Was ist Challenge Cup?**');
				this.say(con, room, prefix + 'A: "Challenge Cup" ist ein Tier, bei dem man kein Team braucht. Zu Beginn des Kampfes bekommt man 6 Pokémon, deren Attacken, Items etc. zufällig, aber legal sind. Mit diesen Pokémon kämpft man dann.');
				break;
			case "catchevolve":
				this.say(con, room, prefix + 'Q: **Was ist Catch&Evolve?**');
				this.say(con, room, prefix + 'A: Catch&Evolve ist ein (häufig von Usern erstelltes) Turnier, welches meist über Challonge abläuft. Die Regeln stehen hier: http://tinyurl.com/pc8pksg.');
				break;
			case "challonge":
				this.say(con, room, prefix + 'Q: **Was ist Challonge?**');
				this.say(con, room, prefix + 'A: "Challonge" ist eine Website, die Brackets für Turniere generiert. Damit können auch User, die auf dem Server keine in-Chat Turniere machen dürfen, Turniere veranstalten. Link zur Website: challonge.com.');
				break;
			case "vgc":
				this.say(con, room, prefix + 'Q: **Was ist VGC?**');
				this.say(con, room, prefix + 'A: "VGC" ist ein spezieller Doppelkampf-Modus, der auf offiziellen Veranstaltungen gespielt wird. Vor dem Kampf sieht man das gegnerische Team und muss anschließend vier seiner sechs Pokémon auswählen, mit denen man kämpfen möchte. Die genauen Regeln wechseln jährlich.');
				break;
			default:
				this.say(con, room, prefix + 'Es gibt keinen FAQ Eintrag zu ' + arg + '.');
				break;
		}
	},
	//Don't ask me about this command....
	unfaq: "troll",
	troll: function (arg, by, room, con) {
		var prefix;
		if (this.canUse('troll', room, by) || room.charAt(0) === ',') {
			prefix = '';
		} else {
			prefix = '/pm ' + by + ', ';
		}
		arg = toId(arg);
		if (!arg) return false;
		switch (arg) {
			case "fairyfee":
				this.say(con, room, prefix + 'Q: **Warum hat Fairy Fee mich nicht lieb?**');
				this.say(con, room, prefix + 'A: Das weiß leider niemand... __(T.T)__');
				break;
			case "trauer":
				this.say(con, room, prefix + 'Q: **Wer ist Trauer?**');
				this.say(con, room, prefix + 'A: Irgendso ein Troll bei dem Rechtemissbrauch keiner is. (Aussage asgdf)');
				break;
			case "freigeist":
				this.say(con, room, prefix + 'Q: **Wer ist Freigeist?**');
				this.say(con, room, prefix + 'A: Freigeist ist ein dufter Typ, betet ihn an! xD');
				break;
			case "highfly":
				this.say(con, room, prefix + 'Q: **Wer ist Highfly?**');
				this.say(con, room, prefix + 'A: High... wer?');
				break;
			case "silver99":
				this.say(con, room, prefix + 'Q: **Wer ist silver99?**');
				this.say(con, room, prefix + 'A: silver99 ist dieser Typ, der gerne mal getrollt wird, sobald es mal möglich ist. Sein Modlog auf einem anderen nicht weiter genannten Server besteht aus über 380 Zeilen von denen knapp 20 alleine Bans sind.');
				break;
			case "burgerfresser":
				this.say(con, room, prefix + 'Q: **Wer ist burgerfresser?**');
				this.say(con, room, prefix + 'A: Ist so ein Typ der sich durch jedes Turnier haxxt. **Mach deine Cheats aus burger!!11einseinself!!**');
				break;
			case "wertzu":
				this.say(con, room, prefix + 'Q: **Wer ist wertzu?**');
				this.say(con, room, prefix + 'A: Noch so ein Troll allerdings darf man bei ihm die Rechte nicht missbrauchen... __(T.T)__');
				break;
			case "duren":
			case "durengard":
				this.say(con, room, prefix + 'Q: **Wer ist Durengard?**');
				this.say(con, room, prefix + 'A: ._.');
				break;
			case "cavendish":
				this.say(con, room, prefix + 'Q: **Wer ist Cavendish?**');
				this.say(con, room, prefix + 'A: Cave\'n\'Dish is eine urzeitliche Variante des Bed\'n\'Breakfasts und wird heute noch von Höhlenmenschen bevorzugt.');
				break;
			case "tos":
			case "sotsot":
				this.say(con, room, prefix + 'Q: **Wer ist Tos?**');
				this.say(con, room, prefix + 'A: ( ͡° ͜ʖ ͡°) Diese Frage beantwort ich nich!');
				break;
			case "resolut":
				this.say(con, room, prefix + 'Q: **Wer ist Resolut?**');
				this.say(con, room, prefix + 'A: Resolut hat sich nach dem Erlernen der Attacke Mystoschwert in einen Voice verwandelt.');
				break;
			case "crypto":
			case "cryptodarkrai":
				this.say(con, room, prefix + 'Q: **Wer ist Crypto Darkrai?**');
				this.say(con, room, prefix + 'A: Crypto Darkrai ist ein dunkles Pokémon, dessen Herz künstlich verschlossen wurde. Leider hat niemand eine Krallmaschine um es fangen und erlösen zu können.');
				break;
			case "faq":
				this.say(con, room, prefix + 'Q: **Was ist eine FAQ?**');
				this.say(con, room, prefix + 'A: FAQ sind eine Sammlung dummer Fragen inkl. Antworten die immer und immer wieder gestellt werden.');
				break;
			case "modlog":
				this.say(con, room, prefix + 'Q: **Was ist ein Modlog?**');
				this.say(con, room, prefix + 'A: Ein Modlog ist eine Datei auf dem Server die gerne mal von Mods durch sinnlose Aktionen wie Trauer muten zugemüllt wird. Oder die auf anderen nicht näher benannten Servern 20 Bans von silver99 enthalten xD');
				break;
			default:
				this.say(con, room, prefix + 'Es gibt keinen Troll Eintrag zu ' + arg + '.');
				break;
		}
	},

	/**
	 * Dev commands
	 *
	 * These commands are here for highly ranked users (or the creator) to use
	 * to perform arbitrary actions that can't be done through any other commands
	 * or to help with upkeep of the bot.
	 */

	reload: function (arg, by, room, con) {
		if (!this.hasRank(by, '#~')) return false;
		try {
			this.uncacheTree('./commands.js');
			global.Commands = require('./commands.js').commands;
			this.say(con, room, 'Commands reloaded.');
		} catch (e) {
			error('failed to reload: ' + sys.inspect(e));
		}
	},
	custom: function (arg, by, room, con) {
		if (!this.hasRank(by, '~')) return false;
		// Custom commands can be executed in an arbitrary room using the syntax
		// ".custom [room] command", e.g., to do !data pikachu in the room lobby,
		// the command would be ".custom [lobby] !data pikachu". However, using
		// "[" and "]" in the custom command to be executed can mess this up, so
		// be careful with them.
		var tarRoom;
		if (arg.indexOf('[') === 0 && arg.indexOf(']') > -1) {
			tarRoom = arg.slice(1, arg.indexOf(']'));
			arg = arg.substr(arg.indexOf(']') + 1).trim();
		}
		this.say(con, tarRoom || room, arg);
	},
	js: function (arg, by, room, con) {
		if (config.excepts.indexOf(toId(by)) === -1) return false;
		try {
			var result = eval(arg.trim());
			this.say(con, room, JSON.stringify(result));
		} catch (e) {
			this.say(con, room, e.name + ": " + e.message);
		}
	},

	/**
	 * Room Owner commands
	 *
	 * These commands allow room owners to personalise settings for moderation and command use.
	 */

	settings: 'set',
	set: function (arg, by, room, con) {
		if (!this.hasRank(by, '%@&#~') || room.charAt(0) === ',') return false;

		var settable = {
			say: 1,
			joke: 1,
			choose: 1,
			usagestats: 1,
			buzz: 1,
			helix: 1,
			randomtype: 1,
			survivor: 1,
			games: 1,
			wifi: 1,
			monotype: 1,
			autoban: 1,
			viewblacklist: 1,
			'switch': 1,
			banword: 1,
			viewbannedwords: 1,
			git: 1,
			faq: 1,
			troll: 1,
			modchat: 1
		};
		var modOpts = {
			flooding: 1,
			caps: 1,
			stretching: 1,
			bannedwords: 1,
			snen: 1
		};

		var opts = arg.split(',');
		var cmd = toId(opts[0]);
		if (cmd === 'mod' || cmd === 'm' || cmd === 'modding') {
			if (!opts[1] || !toId(opts[1]) || !(toId(opts[1]) in modOpts)) return this.say(con, room, 'Incorrect command: correct syntax is ' + config.commandcharacter + 'set mod, [' +
				Object.keys(modOpts).join('/') + '](, [on/off])');

			if (!this.settings['modding']) this.settings['modding'] = {};
			if (!this.settings['modding'][room]) this.settings['modding'][room] = {};
			if (opts[2] && toId(opts[2])) {
				if (!this.hasRank(by, '#~')) return false;
				if (!(toId(opts[2]) in {on: 1, off: 1}))  return this.say(con, room, 'Incorrect command: correct syntax is ' + config.commandcharacter + 'set mod, [' +
					Object.keys(modOpts).join('/') + '](, [on/off])');
				if (toId(opts[2]) === 'off') {
					this.settings['modding'][room][toId(opts[1])] = 0;
				} else {
					delete this.settings['modding'][room][toId(opts[1])];
				}
				this.writeSettings();
				this.say(con, room, 'Moderation for ' + toId(opts[1]) + ' in this room is now ' + toId(opts[2]).toUpperCase() + '.');
				return;
			} else {
				this.say(con, room, 'Moderation for ' + toId(opts[1]) + ' in this room is currently ' +
					(this.settings['modding'][room][toId(opts[1])] === 0 ? 'OFF' : 'ON') + '.');
				return;
			}
		} else {
			if (!Commands[cmd]) return this.say(con, room, config.commandcharacter + '' + opts[0] + ' is not a valid command.');
			var failsafe = 0;
			while (!(cmd in settable)) {
				if (typeof Commands[cmd] === 'string') {
					cmd = Commands[cmd];
				} else if (typeof Commands[cmd] === 'function') {
					if (cmd in settable) {
						break;
					} else {
						this.say(con, room, 'The settings for ' + config.commandcharacter + '' + opts[0] + ' cannot be changed.');
						return;
					}
				} else {
					this.say(con, room, 'Something went wrong. PM Freigeist here or on Smogon with the command you tried.');
					return;
				}
				failsafe++;
				if (failsafe > 5) {
					this.say(con, room, 'The command "' + config.commandcharacter + '' + opts[0] + '" could not be found.');
					return;
				}
			}

			var settingsLevels = {
				off: false,
				disable: false,
				'+': '+',
				'%': '%',
				'@': '@',
				'&': '&',
				'#': '#',
				'~': '~',
				on: true,
				enable: true
			};
			if (!opts[1] || !opts[1].trim()) {
				var msg = '';
				if (!this.settings[cmd] || (!this.settings[cmd][room] && this.settings[cmd][room] !== false)) {
					msg = '.' + cmd + ' is available for users of rank ' + ((cmd === 'autoban' || cmd === 'banword') ? '#' : config.defaultrank) + ' and above.';
				} else if (this.settings[cmd][room] in settingsLevels) {
					msg = '.' + cmd + ' is available for users of rank ' + this.settings[cmd][room] + ' and above.';
				} else if (this.settings[cmd][room] === true) {
					msg = '.' + cmd + ' is available for all users in this room.';
				} else if (this.settings[cmd][room] === false) {
					msg = '' + config.commandcharacter + '' + cmd + ' is not available for use in this room.';
				}
				this.say(con, room, msg);
				return;
			} else {
				if (!this.hasRank(by, '#~')) return false;
				var newRank = opts[1].trim();
				if (!(newRank in settingsLevels)) return this.say(con, room, 'Unknown option: "' + newRank + '". Valid settings are: off/disable, +, %, @, &, #, ~, on/enable.');
				if (!this.settings[cmd]) this.settings[cmd] = {};
				this.settings[cmd][room] = settingsLevels[newRank];
				this.writeSettings();
				this.say(con, room, 'The command ' + config.commandcharacter + '' + cmd + ' is now ' +
					(settingsLevels[newRank] === newRank ? ' available for users of rank ' + newRank + ' and above.' :
					(this.settings[cmd][room] ? 'available for all users in this room.' : 'unavailable for use in this room.')));
			}
		}
	},
	blacklist: 'autoban',
	ban: 'autoban',
	ab: 'autoban',
	autoban: function (arg, by, room, con) {
		if (!this.canUse('autoban', room, by) || room.charAt(0) === ',') return false;
		if (!this.hasRank(this.ranks[room] || ' ', '@&#~')) return this.say(con, room, config.nick + ' requires rank of @ or higher to (un)blacklist.');

		arg = arg.split(',');
		var added = [];
		var illegalNick = [];
		var alreadyAdded = [];
		if (!arg.length || (arg.length === 1 && !arg[0].trim().length)) return this.say(con, room, 'You must specify at least one user to blacklist.');
		for (var i = 0; i < arg.length; i++) {
			var tarUser = toId(arg[i]);
			if (tarUser.length < 1 || tarUser.length > 18) {
				illegalNick.push(tarUser);
				continue;
			}
			if (!this.blacklistUser(tarUser, room)) {
				alreadyAdded.push(tarUser);
				continue;
			}
			this.say(con, room, '/roomban ' + tarUser + ', Blacklisted user');
			this.say(con, room, '/modnote ' + tarUser + ' was added to the blacklist by ' + by + '.');
			added.push(tarUser);
		}

		var text = '';
		if (added.length) {
			text += 'User(s) "' + added.join('", "') + '" added to blacklist successfully. ';
			this.writeSettings();
		}
		if (alreadyAdded.length) text += 'User(s) "' + alreadyAdded.join('", "') + '" already present in blacklist. ';
		if (illegalNick.length) text += 'All ' + (text.length ? 'other ' : '') + 'users had illegal nicks and were not blacklisted.';
		this.say(con, room, text);
	},
	unblacklist: 'unautoban',
	unban: 'unautoban',
	unab: 'unautoban',
	unautoban: function (arg, by, room, con) {
		if (!this.canUse('autoban', room, by) || room.charAt(0) === ',') return false;
		if (!this.hasRank(this.ranks[room] || ' ', '@&#~')) return this.say(con, room, config.nick + ' requires rank of @ or higher to (un)blacklist.');

		arg = arg.split(',');
		var removed = [];
		var notRemoved = [];
		if (!arg.length || (arg.length === 1 && !arg[0].trim().length)) return this.say(con, room, 'You must specify at least one user to unblacklist.');
		for (var i = 0; i < arg.length; i++) {
			var tarUser = toId(arg[i]);
			if (tarUser.length < 1 || tarUser.length > 18) {
				notRemoved.push(tarUser);
				continue;
			}
			if (!this.unblacklistUser(tarUser, room)) {
				notRemoved.push(tarUser);
				continue;
			}
			this.say(con, room, '/roomunban ' + tarUser);
			removed.push(tarUser);
		}

		var text = '';
		if (removed.length) {
			text += 'User(s) "' + removed.join('", "') + '" removed from blacklist successfully. ';
			this.writeSettings();
		}
		if (notRemoved.length) text += (text.length ? 'No other ' : 'No ') + 'specified users were present in the blacklist.';
		this.say(con, room, text);
	},
	viewbans: 'viewblacklist',
	vab: 'viewblacklist',
	viewautobans: 'viewblacklist',
	viewblacklist: function (arg, by, room, con) {
		if (!this.canUse('viewblacklist', room, by) || room.charAt(0) === ',') return false;

		var text = '';
		if (!this.settings.blacklist || !this.settings.blacklist[room]) {
			text = 'No users are blacklisted in this room.';
		} else {
			if (arg.length) {
				var nick = toId(arg);
				if (nick.length < 1 || nick.length > 18) {
					text = 'Invalid nickname: "' + nick + '".';
				} else {
					text = 'User "' + nick + '" is currently ' + (nick in this.settings.blacklist[room] ? '' : 'not ') + 'blacklisted in ' + room + '.';
				}
			} else {
				var nickList = Object.keys(this.settings.blacklist[room]);
				if (!nickList.length) return this.say(con, room, '/pm ' + by + ', No users are blacklisted in this room.');
				this.uploadToHastebin(con, room, by, 'The following users are banned in ' + room + ':\n\n' + nickList.join('\n'));
				return;
			}
		}
		this.say(con, room, '/pm ' + by + ', ' + text);
	},
	banphrase: 'banword',
	banword: function (arg, by, room, con) {
		if (!this.canUse('banword', room, by)) return false;
		if (!this.settings.bannedphrases) this.settings.bannedphrases = {};
		arg = arg.trim().toLowerCase();
		if (!arg) return false;
		var word, level;
		var commaIndex = arg.lastIndexOf(",");
		if (commaIndex > -1) {
			word = arg.substr(0, commaIndex).trim();
			if (!word) {
				this.say(con, room, "/pm " + by + ", Please specify a word to ban.");
				return false;
			}
			level = parseInt(arg.substring(commaIndex + 1));
			if (isNaN(level) || level < 1 || level > 5) {
				this.say(con, room, "/pm " + by + ", The banlevel must be a valid number between 1 and 5.");
				return false;
			}
		} else {
			word = arg;
			level = 2;
		}

		var tarRoom = room;

		if (room.charAt(0) === ',') {
			if (!this.hasRank(by, '~')) return false;
			tarRoom = 'global';
		}

		if (!this.settings.bannedphrases[tarRoom]) this.settings.bannedphrases[tarRoom] = {};
		if (word in this.settings.bannedphrases[tarRoom] && this.settings.bannedphrases[tarRoom][word] === level) return this.say(con, room, "Phrase \"" + word + "\" is already banned.");
		this.settings.bannedphrases[tarRoom][word] = level;
		this.writeSettings();
		this.say(con, room, "Phrase \"" + word + "\" is now banned with level " + level + ".");
	},
	unbanphrase: 'unbanword',
	unbanword: function (arg, by, room, con) {
		if (!this.canUse('banword', room, by)) return false;
		arg = arg.trim().toLowerCase();
		if (!arg) return false;
		var tarRoom = room;

		if (room.charAt(0) === ',') {
			if (!this.hasRank(by, '~')) return false;
			tarRoom = 'global';
		}

		if (!this.settings.bannedphrases || !this.settings.bannedphrases[tarRoom] || !(arg in this.settings.bannedphrases[tarRoom]))
			return this.say(con, room, "Phrase \"" + arg + "\" is not currently banned.");
		delete this.settings.bannedphrases[tarRoom][arg];
		if (!Object.size(this.settings.bannedphrases[tarRoom])) delete this.settings.bannedphrases[tarRoom];
		if (!Object.size(this.settings.bannedphrases)) delete this.settings.bannedphrases;
		this.writeSettings();
		this.say(con, room, "Phrase \"" + arg + "\" is no longer banned.");
	},
	viewbannedphrases: 'viewbannedwords',
	vbw: 'viewbannedwords',
	viewbannedwords: function (arg, by, room, con) {
		if (!this.canUse('viewbannedwords', room, by)) return false;
		arg = arg.trim().toLowerCase();
		var tarRoom = room;

		if (room.charAt(0) === ',') {
			if (!this.hasRank(by, '~')) return false;
			tarRoom = 'global';
		}

		var text = "";
		if (!this.settings.bannedphrases || !this.settings.bannedphrases[tarRoom]) {
			text = "No phrases are banned in this room.";
		} else {
			if (arg.length) {
				text = "The phrase \"" + arg + "\" is currently " + (arg in this.settings.bannedphrases[tarRoom] ? "" : "not ") + "banned " +
					(room.charAt(0) === ',' ? "globally" : "in " + room) + ".";
			} else {
				var banList = "";
				for (var x in this.settings.bannedphrases[tarRoom])
					banList += x + "(" + this.settings.bannedphrases[tarRoom][x] + ")\n";
				if (!banList.length) return this.say(con, room, "No phrases are banned in this room.");
				this.uploadToHastebin(con, room, by, "The following phrases are banned " + (room.charAt(0) === ',' ? "globally" : "in " + room) + ":\n\n" + banList);
				return;
			}
		}
		this.say(con, room, text);
	},

	/**
	 * General commands
	 *
	 * Add custom commands here.
	 */

	tournament: 'tour',
	tour: function (arg, by, room, con) {
		if (room.charAt(0) === ',' || !toId(arg)) return false;
		if (!this.hasRank(this.ranks[room] || ' ', '@#~')) {
			if (!this.hasRank(by, '+%@&#~')) return false;
			return this.say(con, room, config.nick + " requires @ or higher to use the tournament system.");
		}
		arg = arg.split(',');
		if (!this.settings.tourwhitelist) this.settings.tourwhitelist = {};
		if (!this.settings.tourwhitelist[room]) this.settings.tourwhitelist[room] = {};
		if (toId(arg[0]) === 'whitelist') {
			if (!this.hasRank(by, '@&#~')) return false;
			var action = toId(arg[1] || '');
			if (!action || action === 'view') {
				var nickList = Object.keys(this.settings.tourwhitelist[room]);
				if (!nickList.length) return this.say(con, room, "/pm " + by + ", No users are whitelisted in " + room + ".");
				return this.uploadToHastebin(con, room, by, "The following users are allowed to control tournaments in " + room + ":\n\n" + nickList.join("\n"));
			}
			var target = toId(arg[2] || '');
			if (!action || !(action in {'add': 1, 'remove': 1}) || !target) return this.say(con, room, "Incorrect syntax: .tour whitelist, [view/add/remove](, [user])");
			if (action === 'add') {
				this.settings.tourwhitelist[room][target] = 1;
				this.say(con, room, "User " + arg[2] + " is now whitelisted and can control tournaments.");
			} else {
				if (target in this.settings.tourwhitelist[room]) delete this.settings.tourwhitelist[room][target];
				this.say(con, room, "User " + arg[2] + " is no longer whitelisted.");
			}
			this.writeSettings();
		} else {
			if (!(this.hasRank(by, (toId(arg[0].split(' ')[0]) in {'dq': 1, 'disqualify': 1} ? '%@' : '') + '&#~') || toId(by) in this.settings.tourwhitelist[room]) || toId(arg[0]) in {'join': 1, 'in': 1, 'j': 1}) return false;
			this.say(con, room, "/tour " + arg.join(','));
		}
	},
	modchat: function (arg, by, room, con) {
		if (!this.canUse('modchat', room, by)) return false;
		if (!arg) return false;
		if (arg.toLowerCase() in {'off': 1, 'false': 1, 'no': 1, 'ac': 1, 'autoconfirmed': 1, '+': 1})
			this.say(con, room, "/modchat " + arg);
	},
	tell: 'say',
	say: function (arg, by, room, con) {
		if (!this.canUse('say', room, by)) return false;
		this.say(con, room, stripCommands(arg) + ' (' + by + ' said this)');
	},
	joke: function (arg, by, room, con) {
		if (!this.canUse('joke', room, by) || room.charAt(0) === ',') return false;
		var self = this;

		var reqOpt = {
			hostname: 'api.icndb.com',
			path: '/jokes/random',
			method: 'GET'
		};
		var req = http.request(reqOpt, function (res) {
			res.on('data', function (chunk) {
				try {
					var data = JSON.parse(chunk);
					self.say(con, room, data.value.joke.replace(/&quot;/g, "\""));
				} catch (e) {
					self.say(con, room, 'Sorry, couldn\'t fetch a random joke... :(');
				}
			});
		});
		req.end();
	},
	choose: function (arg, by, room, con) {
		var choices;
		if (arg.indexOf(',') === -1) {
			choices = arg.split(' ');
		} else {
			choices = arg.split(',');
		}
		choices = choices.filter(function (i) {return (toId(i) !== '');});
		if (choices.length < 2) return this.say(con, room, (room.charAt(0) === ',' ? '' : '/pm ' + by + ', ') + '.choose: You must give at least 2 valid choices.');

		var choice = choices[Math.floor(Math.random() * choices.length)];
		this.say(con, room, ((this.canUse('choose', room, by) || room.charAt(0) === ',') ? '' : '/pm ' + by + ', ') + stripCommands(choice));
	},
	usage: 'usagestats',
	usagestats: function (arg, by, room, con) {
		var text;
		if (this.canUse('usagestats', room, by) || room.charAt(0) === ',') {
			text = '';
		} else {
			text = '/pm ' + by + ', ';
		}
		text += 'http://www.smogon.com/stats/2014-11/';
		this.say(con, room, text);
	},
	seen: function (arg, by, room, con) { // this command is still a bit buggy
		var text = (room.charAt(0) === ',' ? '' : '/pm ' + by + ', ');
		arg = toId(arg);
		if (!arg || arg.length > 18) return this.say(con, room, text + 'Invalid username.');
		if (arg === toId(by)) {
			text += 'Have you looked in the mirror lately?';
		} else if (arg === toId(config.nick)) {
			text += 'You might be either blind or illiterate. Might want to get that checked out.';
		} else if (!this.chatData[arg] || !this.chatData[arg].seenAt) {
			text += 'The user ' + arg + ' has never been seen.';
		} else {
			text += arg + ' was last seen ' + this.getTimeAgo(this.chatData[arg].seenAt) + ' ago' + (
				this.chatData[arg].lastSeen ? ', ' + this.chatData[arg].lastSeen : '.');
		}
		this.say(con, room, text);
	},
	helix: function (arg, by, room, con) {
		var text;
		if (this.canUse('helix', room, by) || room.charAt(0) === ',') {
			text = '';
		} else {
			text = '/pm ' + by + ', ';
		}

		var rand = Math.floor(20 * Math.random()) + 1;

		switch (rand) {
			case 1: text += "Signs point to yes."; break;
			case 2: text += "Yes."; break;
			case 3: text += "Reply hazy, try again."; break;
			case 4: text += "Without a doubt."; break;
			case 5: text += "My sources say no."; break;
			case 6: text += "As I see it, yes."; break;
			case 7: text += "You may rely on it."; break;
			case 8: text += "Concentrate and ask again."; break;
			case 9: text += "Outlook not so good."; break;
			case 10: text += "It is decidedly so."; break;
			case 11: text += "Better not tell you now."; break;
			case 12: text += "Very doubtful."; break;
			case 13: text += "Yes - definitely."; break;
			case 14: text += "It is certain."; break;
			case 15: text += "Cannot predict now."; break;
			case 16: text += "Most likely."; break;
			case 17: text += "Ask again later."; break;
			case 18: text += "My reply is no."; break;
			case 19: text += "Outlook good."; break;
			case 20: text += "Don't count on it."; break;
		}
		this.say(con, room, text);
	},

	rt: "randomtype",
	randomtype: function (arg, by, room, con) {
		var text;
		if (this.canUse('randomtype', room, by) || room.charAt(0) === ',') {
			text = '';
		} else {
			text = '/pm ' + by + ', ';
		}

		var types = ["Fairy", "Fire", "Flying", "Ice", "Poison", "Psychic", "Dark", "Electric", "Grass", "Ground", "Rock", "Water", "Dragon", "Bug", "Normal", "Steel", "Fighting", "Ghost"];
		var rand = Math.floor(types.length * Math.random());

		text += types[rand];
		this.say(con, room, text);
	}

	/**
	 * Room specific commands
	 *
	 * These commands are used in specific rooms on the Smogon server.
	 */

};
