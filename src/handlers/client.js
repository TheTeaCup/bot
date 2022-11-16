const {GatewayIntentBits, Client, Collection} = require("discord.js");
const Tea = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],});

Tea.Commands = new Collection();
Tea.Aliases = new Collection();

Tea.Color = "#8d8bdb";
Tea.ErrorColor = 0xf64465;
Tea.Developers = [

    "338192747754160138", /* tea */

];

require("./events")(Tea);
//require("./commands")(Tea);

Tea.on("ready", () => {
   // require("./jobs")(Tea);
});

module.exports = Tea;