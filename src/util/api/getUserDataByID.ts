import axios from 'axios'
import config from '../../../config.json'
import OfficialServerInfo from '../../types/OfficialServerInfo'
import ResumedOfficialServerInfo from '../../types/ResumedOfficialServerInfo'
import PlayerData from '../../types/PlayerData'


export default async function getUserDataByID(playerID: string) {

    if (playerID.match(/^[0-9]+$/) == null) {
        return
    }
    //First search for ID, if not found any user search for username.
    let Player: PlayerData =await (await axios.get(`${config.PlayersListAPIURL}/${playerID}`, {params: {
        include: "server" //Important to put this to include the servers the player has played in
    }})).data as PlayerData //If an error is thrown its just probably that an username was used instead of an ID. Just ignore the error and continue.

    if (!Player) {
        return
    }
    return Player



    

}