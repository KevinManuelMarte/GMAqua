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
exports.default = getUserDataByID;
const axios_1 = __importDefault(require("axios"));
const config_json_1 = __importDefault(require("../../../config.json"));
function getUserDataByID(playerID) {
    return __awaiter(this, void 0, void 0, function* () {
        if (playerID.match(/^[0-9]+$/) == null) {
            return;
        }
        //First search for ID, if not found any user search for username.
        let Player = yield (yield axios_1.default.get(`${config_json_1.default.PlayersListAPIURL}/${playerID}`, { params: {
                include: "server" //Important to put this to include the servers the player has played in
            } })).data; //If an error is thrown its just probably that an username was used instead of an ID. Just ignore the error and continue.
        if (!Player) {
            return;
        }
        return Player;
    });
}
