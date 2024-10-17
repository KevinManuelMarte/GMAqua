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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getResumedOfficialServerInformationByID;
const axios_1 = __importDefault(require("axios"));
const config_json_1 = __importDefault(require("../../../config.json"));
const ResumedOfficialServerInfo_1 = __importDefault(require("../../types/ResumedOfficialServerInfo"));
function getResumedOfficialServerInformationByID(serverID) {
    return __awaiter(this, void 0, void 0, function* () {
        if (serverID.match(/^[0-9]+$/) == null) {
            return;
        }
        //First try to check if there is a server that its name 100% match with the provided argument.
        //if not, try to see if any server contains the provided argument as a substring
        const ServerFound = yield (yield axios_1.default.get(`${config_json_1.default.ServersListURL}/${serverID}`)).data.data;
        let Server = new ResumedOfficialServerInfo_1.default();
        //For any possible mistakes, convert the names to lower case
        Server.id = ServerFound === null || ServerFound === void 0 ? void 0 : ServerFound.id;
        Server.serverName = ServerFound === null || ServerFound === void 0 ? void 0 : ServerFound.attributes.name;
        Server.playersOnline = ServerFound === null || ServerFound === void 0 ? void 0 : ServerFound.attributes.players;
        Server.maxPlayers = ServerFound === null || ServerFound === void 0 ? void 0 : ServerFound.attributes.maxPlayers;
        Server.mapName = ServerFound === null || ServerFound === void 0 ? void 0 : ServerFound.attributes.details.map;
        Server.day = 'No disponible por el momento, puede que en un futuro lo este';
        Server.ip = ServerFound === null || ServerFound === void 0 ? void 0 : ServerFound.attributes.ip;
        Server.port = ServerFound === null || ServerFound === void 0 ? void 0 : ServerFound.attributes.port;
        Server.platforms = ServerFound === null || ServerFound === void 0 ? void 0 : ServerFound.attributes.details.arksa_platforms;
        if (!Server)
            return;
        if (!Server.serverName)
            return;
        console.log('DID WE GET HERE');
        return Server;
    });
}
