import { ChannelType, CommandInteraction, GuildBasedChannel, GuildChannel, SlashCommandBuilder } from "discord.js";
import config from '../../../config.json'
import getResumedOfficialServerInformation from "../../util/api/getResumedOfficialServerData";
import sendOfficialServerEmbed from "../../util/sendOfficialServerEmbed";


module.exports = {
	data: new SlashCommandBuilder()
		.setName('official-server-name')
        .addStringOption( option => 
            option
            .setName('nombre_servidor')
            .setDescription('Escribe el nombre que tenga el servidor en Battlemetrics')
            .setRequired(true)
            
        
        )
		.setDescription('Busca un servidor en Battlemetrics con el nombre'),
	async execute(interaction: CommandInteraction) {
        const ServerName: string = interaction.options.get("nombre_servidor", true).value as string

        //Defer the reply, the bot might take a bit of time to search before doing anything
        await interaction.deferReply()
        const serverInfo = await getResumedOfficialServerInformation(ServerName).catch(error => {
            return undefined
        }
            )

        if (!serverInfo) {
            return interaction.editReply(`No se pudo encontrar informacion del servidor "${ServerName}".`)
        }
        sendOfficialServerEmbed(interaction, serverInfo)
	},
};