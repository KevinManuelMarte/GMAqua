import { ChannelType, CommandInteraction, GuildBasedChannel, GuildChannel, SlashCommandBuilder } from "discord.js";
import config from '../../../config.json'
import getResumedOfficialServerInformation from "../../util/api/getResumedOfficialServerData";
import sendOfficialServerEmbed from "../../util/sendOfficialServerEmbed";
import getResumedOfficialServerInformationByID from "../../util/api/getResumedOfficialServerDataByID";


module.exports = {
	data: new SlashCommandBuilder()
		.setName('official-server-id')
        .addStringOption( option => 
            option
            .setName('id_servidor')
            .setDescription('Escribe el ID que tiene el servidor en Battlemetrics')
            .setRequired(true)
            
        
        )
		.setDescription('Busca un servidor en Battlemetrics con el ID'),
	async execute(interaction: CommandInteraction) {
        const ServerID: string = interaction.options.get("id_servidor", true).value as string


        //Defer the reply, the bot might take a bit of time to search before doing anything
        await interaction.deferReply()
        const serverInfo = await getResumedOfficialServerInformationByID(ServerID).catch(error => {
            return undefined
        }
            )

        if (!serverInfo) {
            return await interaction.editReply(`No se pudo encontrar informacion del servidor con el ID de "${ServerID}".`)
        }
        sendOfficialServerEmbed(interaction, serverInfo)
	},
};