import { ChannelType, CommandInteraction, GuildBasedChannel, GuildChannel, SlashCommandBuilder } from "discord.js";
import config from '../../../config.json'
import getResumedOfficialServerInformation from "../../util/api/getResumedOfficialServerData";
import sendOfficialServerEmbed from "../../util/sendOfficialServerEmbed";
import PlayerData from "../../types/PlayerData";
import getUserData from "../../util/api/getUserDataByID";
import sendUserDataEmbed from "../../util/sendUserDataEmbed";
import getUserDataByID from "../../util/api/getUserDataByID";
import PlayerDataByID from "../../types/PlayerData";


module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-data-by-id')
        .addStringOption( option => 
            option
            .setName('usuario_id')
            .setDescription('Pon el id que tenga el usuario en Battlemetrics ')
            .setRequired(true)
            
        
        )
		.setDescription('Buscar informacion de un usuario en Battlemetrics mediante el id'),
	async execute(interaction: CommandInteraction) {

        //IMPORTANT
        //Some servers only appear in the player server history when searching with the username in Battlemetrics api, take this in mind
        const UserID: string = interaction.options.get("usuario_id", true).value as string

        const playerData: PlayerData | undefined = await getUserDataByID(UserID).catch(error => {
            return undefined
        }
            )

        //Defer the reply, the bot might take a bit of time to search before doing anything
        await interaction.deferReply()
        if (!playerData) {
            return await interaction.editReply(`No se pudo encontrar la informacion del usuario con el ID ${UserID}. Por favor, revisa que hayas puesto uno correcto, que hayas usado un ID y no un nombre de usuario. Si esta todo bien, espera a que la web actualice antes de volver a buscar.`)
        }

        sendUserDataEmbed(interaction, playerData)
	},
};