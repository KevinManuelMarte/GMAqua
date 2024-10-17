import { ChannelType, CommandInteraction, GuildBasedChannel, GuildChannel, SlashCommandBuilder } from "discord.js";
import config from '../../../config.json'
import getResumedOfficialServerInformation from "../../util/api/getResumedOfficialServerData";
import sendOfficialServerEmbed from "../../util/sendOfficialServerEmbed";
import PlayerData from "../../types/PlayerData";
import getUserData from "../../util/api/getUserDataByID";
import sendUserDataEmbed from "../../util/sendUserDataEmbed";
import getUserDataByUsername from "../../util/api/getUserDataByUsername";
import PlayerDataByUsername from "../../types/PlayerDataByUsername";
import sendUserDataByNameEmbed from "../../util/sendUserByNameDataEmbed";
import OfficialServerInfo from "../../types/OfficialServerInfo";
import ResumedOfficialServerInfo from "../../types/ResumedOfficialServerInfo";
import getResumedOfficialServerInformationByID from "../../util/api/getResumedOfficialServerDataByID";


module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-data-by-name')
        .addStringOption( option => 
            option
            .setName('usuario_name')
            .setDescription('Pon el nombre que tenga el usuario en Battlemetrics ')
            .setRequired(true)
            
        
        )
		.setDescription('Busca la informacion de un usuario en Battlemetrics segun su nombre'),
	async execute(interaction: CommandInteraction) {

        
        //IMPORTANT
        //Some servers only appear in the player server history when searching with the username in Battlemetrics api, take this in mind
        const UserName: string = interaction.options.get("usuario_name", true).value as string


        //Defer the reply, the bot might take a bit of time to search before doing anything
        await interaction.deferReply()
        const playerData: PlayerDataByUsername | undefined = await getUserDataByUsername(UserName).then(value => {
            console.log(value)
            return value
        })

        console.log(playerData)
        if (!playerData) {
            return await interaction.editReply(`No se pudo encontrar la informacion del usuario con el nombre de ${UserName}. Por favor, revisa que hayas puesto uno correcto`)
        }


        const ServersInfo: ResumedOfficialServerInfo[] = []
        let promises: Promise<any>[] = []

        playerData.relationships.servers.data.forEach( async server => {
            const fuckingpromise = new Promise(async (resolve, reject) => {
                const officialServer = await getResumedOfficialServerInformationByID(server.id).catch(error => {
                    return undefined
                }
                    )
                if (officialServer) {
                    ServersInfo.push(officialServer)
                }

                resolve(officialServer)
            })

            promises.push(fuckingpromise)
        });


        

         Promise.all(promises).then(async value => {
            await sendUserDataByNameEmbed(interaction, playerData, ServersInfo)
         })

	},
};