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
exports.default = sendOfficialServerEmbed;
const discord_js_1 = require("discord.js");
function buildEmbed(data) {
    const Embed = new discord_js_1.EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('¡Se ha encontrado un servidor!')
        .setDescription('Por favor, recuerda que el bot siempre envia el primer resultado. Para evitar equivocarse de servidor, escribe bien y lo mas completo que puedas el nombre del servidor')
        .addFields({ name: 'Nombre del servidor', value: `${(0, discord_js_1.codeBlock)(data === null || data === void 0 ? void 0 : data.serverName)}` }, { name: 'Jugadores en linea', value: `${(0, discord_js_1.codeBlock)(data.playersOnline)}` }, { name: 'Limite de jugadores: ', value: `${(0, discord_js_1.codeBlock)(data.maxPlayers)}` }, { name: 'Nombre del mapa', value: `${(0, discord_js_1.codeBlock)(data.mapName)}` }, { name: 'Dia', value: `${(0, discord_js_1.codeBlock)(data.day)}` }, { name: 'IP', value: `${(0, discord_js_1.codeBlock)(data.ip)}` }, { name: 'Puerto', value: `${(0, discord_js_1.codeBlock)(data.port)}` }, { name: 'Plataformas', value: `${(0, discord_js_1.codeBlock)(data.platforms)}` })
        .setTimestamp();
    return Embed;
}
function sendOfficialServerEmbed(interaction, serverData) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const Embed = buildEmbed(serverData);
        if ((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.isSendable()) {
            return yield interaction.editReply({ embeds: [Embed] });
        }
        return yield interaction.editReply('Por alguna razon el mensaje con informacion del servidor no se pudo enviar.');
    });
}
