const Discord = require('discord.js');
const client  = new Discord.Client();
const auth    = require('./auth.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if ( msg.content.indexOf( "!" ) === 0 ) {
		let args = msg.content.substring(1).split(' ');
		const cmd  = args[0];

		args = args.splice(1);
		switch( cmd ) {
			case "help":
				msg.reply('This bot is under construction.');
				break;
			default:
				msg.reply('Command not recognized. Try !help for available commands.');
				break;
		}
	}
});

client.login(auth.token);
