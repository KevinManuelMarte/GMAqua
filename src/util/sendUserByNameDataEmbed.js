"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendUserDataByNameEmbed;
const discord_js_1 = require("discord.js");
function buildEmbed(playerData, userPlayedServers, OfficialServersData) {
    const Embed = new discord_js_1.EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('¡Se ha encontrado a un usuario!')
        .setDescription('Si eligiste buscar el usuario por el nombre, recuerda que el bot eligira siempre al primero que aparezca de todos. Asegurate de escribir bien el nombre antes de buscar. Por favor, recuerda que los datos son sacados de Battlemetrics. Puede que no esten actualizados. Las fechas estan en formato "año-mes-dia"')
        .addFields({ name: 'ID del usuario (ID de Battlemetric)', value: `${(0, discord_js_1.codeBlock)(playerData.id)}` }, { name: 'Nombre del usuario', value: `${(0, discord_js_1.codeBlock)(playerData.attributes.name)} \u200B ` }, { name: 'Servidores en los que ha estado', value: `Recuerda que los datos son sacados de Battlemetrics. Por lo que, si no estan actualizados ahi, no saldran completos aqui tampoco.` })
        .setTimestamp();
    if (!userPlayedServers.length) {
        Embed.addFields({
            name: `No se han encontrado servidores`,
            value: `Puede que sea o porque el usuario no ha entrado a servidores publicos, o que la web de Battlemetrics aun no ha actualizado su informacion.`
        });
    }
    //The embed have a maximum of 25 fields, so to make sure we dont get past that limit
    //we have count the number of fields and stop it when it is at 25 fields.
    let numberOfFields = 4;
    userPlayedServers.reverse().forEach((server) => {
        numberOfFields++;
        if (numberOfFields == 25)
            return;
        const OfficialServer = OfficialServersData.find(officialserver => {
            return officialserver.id == server.id;
        });
        //Time played needs to be rounded because if not something like 93.33333 can be there instead of 93
        const Data = `
Tiempo de juego: ${Math.round(server.meta.timePlayed / 60)} minutos
ID del servidor: ${server.id} 
Primera vez visto: ${server.meta.firstSeen.split('T')[0]} ${server.meta.lastSeen.split('T')[1].split('.')[0]} (Hora UTC) 
Ultima vez visto: ${server.meta.lastSeen.split('T')[0]} ${server.meta.lastSeen.split('T')[1].split('.')[0]} (Hora UTC) `;
        Embed.addFields({
            name: `${OfficialServer === null || OfficialServer === void 0 ? void 0 : OfficialServer.serverName}`,
            value: `${(0, discord_js_1.codeBlock)(Data)}`
        });
    });
    Embed.setFooter({ text: 'AVISO: algunos servidores solo salen si se busca el usuario por nombre. Cosa de Battlemetrics.' });
    return Embed;
}
function sendUserDataByNameEmbed(interaction, userData, officialServersData) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log(officialServersData);
        const Embed = buildEmbed(userData, userData.relationships.servers.data, officialServersData);
        if ((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.isSendable()) {
            return yield interaction.editReply({ embeds: [Embed] });
        }
        return yield interaction.editReply('Por alguna razon el mensaje con informacion del servidor no se pudo enviar.');
    });
}
