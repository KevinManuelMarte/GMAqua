import { CommandInteraction, EmbedBuilder, codeBlock } from 'discord.js';
import ResumedOfficialServerInfo from '../types/ResumedOfficialServerInfo';


function buildEmbed (data: ResumedOfficialServerInfo) {

    const Embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('¡Se ha encontrado un servidor!')
    .setDescription('Por favor, recuerda que el bot siempre envia el primer resultado. Para evitar equivocarse de servidor, escribe bien y lo mas completo que puedas el nombre del servidor')


    .addFields(
        { name: 'Nombre del servidor', value: `${codeBlock(data?.serverName as string)}` },
        { name: 'Jugadores en linea', value: `${codeBlock(data.playersOnline as unknown as string)}` },
        { name: 'Limite de jugadores: ', value: `${codeBlock(data.maxPlayers as unknown as string)}` },
        { name: 'Nombre del mapa', value: `${codeBlock(data.mapName as string)}` },
        { name: 'Dia', value: `${codeBlock(data.day as string)}` },
        { name: 'IP', value: `${codeBlock(data.ip as string)}` },
        { name: 'Puerto', value: `${codeBlock(data.port as unknown as string)}` },
        { name: 'Plataformas', value: `${codeBlock(data.platforms as unknown as string)}` },
    )
    .setTimestamp()

    return Embed

}


export default async function sendOfficialServerEmbed (interaction: CommandInteraction, serverData: ResumedOfficialServerInfo) {
    const Embed = buildEmbed(serverData);

    if (interaction.channel?.isSendable()) {
        return await interaction.editReply({embeds: [Embed]})
    }

    return await interaction.editReply('Por alguna razon el mensaje con informacion del servidor no se pudo enviar.')


}