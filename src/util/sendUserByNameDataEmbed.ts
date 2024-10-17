import { CommandInteraction, EmbedBuilder, codeBlock } from 'discord.js';
import PlayerData from '../types/PlayerData';
import PlayedServerData from '../types/PlayedServerData';
import PlayerDataByID from '../types/PlayerData';
import PlayersDataByUsernamePlayedServer from '../types/PlayerDataByUsernamePlayedServers';
import PlayerDataByUsername from '../types/PlayerDataByUsername';
import OfficialServerInfo from '../types/OfficialServerInfo';
import ResumedOfficialServerInfo from '../types/ResumedOfficialServerInfo';


function buildEmbed (playerData: PlayerDataByUsername, userPlayedServers: PlayersDataByUsernamePlayedServer[], OfficialServersData: ResumedOfficialServerInfo[]) {

    const Embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('¡Se ha encontrado a un usuario!')
    .setDescription('Si eligiste buscar el usuario por el nombre, recuerda que el bot eligira siempre al primero que aparezca de todos. Asegurate de escribir bien el nombre antes de buscar. Por favor, recuerda que los datos son sacados de Battlemetrics. Puede que no esten actualizados. Las fechas estan en formato "año-mes-dia"')


    .addFields(
        { name: 'ID del usuario (ID de Battlemetric)', value: `${codeBlock(playerData.id as string)}` },
        { name: 'Nombre del usuario', value: `${codeBlock(playerData.attributes.name as string)} \u200B ` },
        { name: 'Servidores en los que ha estado', value: `Recuerda que los datos son sacados de Battlemetrics. Por lo que, si no estan actualizados ahi, no saldran completos aqui tampoco.` },
        
    )
    
    .setTimestamp()


    if (!userPlayedServers.length) {
        Embed.addFields(
            {
                name: `No se han encontrado servidores`, 
                value: `Puede que sea o porque el usuario no ha entrado a servidores publicos, o que la web de Battlemetrics aun no ha actualizado su informacion.`}
        )
    }

    

    //The embed have a maximum of 25 fields, so to make sure we dont get past that limit
    //we have count the number of fields and stop it when it is at 25 fields.
    let numberOfFields = 4
    userPlayedServers.reverse().forEach((server) => {
        numberOfFields++

        if (numberOfFields == 25) return;

        const OfficialServer = OfficialServersData.find(officialserver => {
            return officialserver.id == server.id
        } )


        //Time played needs to be rounded because if not something like 93.33333 can be there instead of 93
        const Data: string = `
Tiempo de juego: ${Math.round(server.meta.timePlayed / 60)} minutos
ID del servidor: ${server.id} 
Primera vez visto: ${server.meta.firstSeen.split('T')[0]} ${server.meta.lastSeen.split('T')[1].split('.')[0]} (Hora UTC) 
Ultima vez visto: ${server.meta.lastSeen.split('T')[0]} ${server.meta.lastSeen.split('T')[1].split('.')[0]} (Hora UTC) ` 
        
        Embed.addFields(
            {
                name: `${OfficialServer?.serverName}`, 
                value: `${codeBlock(Data)}`}
        )
    })

    Embed.setFooter({text: 'AVISO: algunos servidores solo salen si se busca el usuario por nombre. Cosa de Battlemetrics.'})

    return Embed

}


export default async function sendUserDataByNameEmbed (interaction: CommandInteraction, userData: PlayerDataByUsername, officialServersData: ResumedOfficialServerInfo[]) {

    console.log(officialServersData)
    const Embed = buildEmbed(userData, userData.relationships.servers.data, officialServersData);

    if (interaction.channel?.isSendable()) {
        return await interaction.editReply({embeds: [Embed]})
    }

    return await interaction.editReply('Por alguna razon el mensaje con informacion del servidor no se pudo enviar.')


}