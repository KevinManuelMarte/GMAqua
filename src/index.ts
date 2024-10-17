import { Client, GatewayIntentBits, Events, Collection, Interaction, OmitPartialGroupDMChannel, Message } from "discord.js";
import config from '../config.json'
import ClientWithCommands from "./types/ClientWithCommands";

import InsertCommandsIntoClient from "./util/insertCommandsIntoClient";


//The reason its importante to make an extended class with an added .commands property is to add all the commmands to the object so we can use them later.
const client = new ClientWithCommands({intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds]});
client.commands = new Collection();

const DiscordToken = config.Token;

//We gotta introduce the commands from the files into the previous object we made with the extended class
InsertCommandsIntoClient(client)


client.once(Events.ClientReady, (readyClient)=> {
    console.log(`Logged in as ${readyClient?.user.tag}`)
    console.log("")
})


client.login(DiscordToken)


client.on(Events.InteractionCreate, (interaction) => {
    if (interaction.isChatInputCommand()) {

        const command = client.commands.get(interaction.commandName);

        command.execute(interaction);

    }
})


