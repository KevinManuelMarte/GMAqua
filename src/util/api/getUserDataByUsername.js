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
exports.default = getUserDataByUsername;
const axios_1 = __importDefault(require("axios"));
const config_json_1 = __importDefault(require("../../../config.json"));
function getUserDataByUsername(playerUsername) {
    return __awaiter(this, void 0, void 0, function* () {
        //First search the user by the username..
        let PlayerListHTTPRequest = yield axios_1.default.get(`${config_json_1.default.PlayersListAPIURL}?filter[search]=${playerUsername}&include=server`, { params: { //Important to put this to include the servers the player has played in
            } }).catch(error => { return; });
        if (!PlayerListHTTPRequest)
            return;
        let PlayerList = yield PlayerListHTTPRequest.data;
        let Player = PlayerList.data[0];
        if (!Player) {
            return;
        }
        // console.log(Player)
        // //Then search the user again by the id we got from the previous search by the username and save hours of confusing and unnecessary classes made for this!
        // let playerByID: PlayerData = await (await axios.get(`${config.PlayersListAPIURL}/${Player.attributes.id}`, {params: {
        //     include: "server" //Important to put this to include the servers the player has played in
        // }})).data as PlayerData //If an error is thrown its just probably that an username was used instead of an ID. Just ignore the error and continue.
        // if (!playerByID) {
        //     return
        // }
        return Player;
    });
}
