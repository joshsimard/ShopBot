const Discord = require('discord.js');
const client  = new Discord.Client();
const auth    = require('./auth.json');
const items   = require('./items/level_1.json');

const _getTraitString = function ( traits ) {
	let result = "";

	traits.forEach( trait => { result += trait + ", "; })

	result = result.substring( 0, result.length -2 );

	return result;
};

// TODO: maybe generate each line to be a max of 60 characters ( seems to be the max to fit )
const _formatItem = function ( item ) {

	if ( !item ) { return "Can't find that item."; }

	return `
	\`\`\`bash
	 -----------------------------------------------------------
	| "${item.name.toUpperCase( )}" (Item ${item.level})        |
	 -----------------------------------------------------------
	| ${_getTraitString( item.traits )}                         |
	|                                                           |
	| Price: "${item.price}"                                    |
	| Description: "${item.description}"                        |
	 -----------------------------------------------------------
	\`\`\`
	`; 
};

const _findItem = function ( name ) {

	let result = null;

	Object.keys( items ).forEach( ( key ) => {
		let item = items[key];
		if ( item.name.toLowerCase() === name.toLowerCase() ) { result = item; }
	} );

	return result;
};

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if ( msg.content.indexOf( "!" ) === 0 ) {
		let args = msg.content.substring(1).split(' ');
		const cmd  = args[0];

		args = args.splice(1);
		switch( cmd ) {
			case "item":
				let name = args.join( " " );
				msg.reply( _formatItem( _findItem( name ) ) );
				break;
			case "random":
				let index = Math.floor ( Math.random() * Object.keys( items ).length );
				msg.reply( _formatItem( items[index]) );
				break;
			case "help":
				msg.reply(`
				Current commands include:
					!random            : displays a random item.
					!item name of item : displays an item of the given name, or a message if not found.
				`);
				break;
			default:
				msg.reply('Command not recognized. Try !help for available commands.');
				break;
		}
	}
});

client.login(auth.token);
