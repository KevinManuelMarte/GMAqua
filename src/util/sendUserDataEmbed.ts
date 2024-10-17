import { CommandInteraction, EmbedBuilder, codeBlock } from 'discord.js';
import PlayerData from '../types/PlayerData';
import PlayedServerData from '../types/PlayedServerData';
import PlayerDataByID from '../types/PlayerData';


function buildEmbed (playerData: PlayerData, userPlayedServers: PlayedServerData[]) {

    const Embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('¡Se ha encontrado a un usuario!')
    .setDescription('Si eligiste buscar el usuario por el nombre, recuerda que el bot eligira siempre al primero que aparezca de todos. Asegurate de escribir bien el nombre antes de buscar. Por favor, recuerda que los datos son sacados de Battlemetrics. Puede que no esten actualizados. Las fechas estan en formato "año-mes-dia"')


    .addFields(
        { name: 'ID del usuario (ID de Battlemetric)', value: `${codeBlock(playerData.data.id as string)}` },
        { name: 'Nombre del usuario', value: `${codeBlock(playerData.data.attributes.name as string)} \u200B ` },
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

    let fields = 2

    userPlayedServers.reverse().forEach((server) => {
        if (fields >= 25) return;
        fields++



        const Data: string = `
ID del servidor: ${server.id} 
Tiempo de juego: ${server.meta.timePlayed / 60} minutos
Primera vez visto: ${server.meta.firstSeen.split('T')[0]} ${server.meta.lastSeen.split('T')[1].split('.')[0]} (Hora UTC) 
Ultima vez visto: ${server.meta.lastSeen.split('T')[0]} ${server.meta.lastSeen.split('T')[1].split('.')[0]} (Hora UTC) ` 
        
        Embed.addFields(
            {
                name: `s`, 
                value: `${codeBlock(Data)}`}
        )
    })

    Embed.setFooter({text: 'AVISO: algunos servidores solo salen si se busca el usuario por nombre. Cosa de Battlemetrics.'})


    return Embed

}


export default async function sendUserDataEmbed (interaction: CommandInteraction, userData: PlayerData) {


    //ALL interaction are deferred after to give the bot more time, so please do .editReply and not .reply()
    const Embed = buildEmbed(userData, userData.included);

    if (interaction.channel?.isSendable()) {
        return await interaction.editReply({embeds: [Embed]})
    }

    return await interaction.editReply('Por alguna razon el mensaje con informacion del servidor no se pudo enviar.')


}