import { Client } from "discord.js";
import config from '../../config.json'

export default class ClientWithCommands extends Client {
    commands: any
}