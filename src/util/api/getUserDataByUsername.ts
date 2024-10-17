import axios from 'axios'
import config from '../../../config.json'
import OfficialServerInfo from '../../types/OfficialServerInfo'
import ResumedOfficialServerInfo from '../../types/ResumedOfficialServerInfo'
import PlayerData from '../../types/PlayerData'
import PlayerDataByUsername from '../../types/PlayerDataByUsername'
import PlayerListBySearchingByUsername from '../../types/PlayerListBySearchingByUsername'


export default async function getUserDataByUsername(playerUsername: string) {

    //First search the user by the username..
    let PlayerListHTTPRequest = await axios.get(`${config.PlayersListAPIURL}?filter[search]=${playerUsername}&include=server`, {params: { //Important to put this to include the servers the player has played in
    }}).catch(error => {return})

    if (!PlayerListHTTPRequest) return;
    let PlayerList: PlayerListBySearchingByUsername = await PlayerListHTTPRequest.data

    let Player: PlayerDataByUsername = PlayerList.data[0]

    if (!Player) {
        return
    }
    // console.log(Player)
    // //Then search the user again by the id we got from the previous search by the username and save hours of confusing and unnecessary classes made for this!

    // let playerByID: PlayerData = await (await axios.get(`${config.PlayersListAPIURL}/${Player.attributes.id}`, {params: {
    //     include: "server" //Important to put this to include the servers the player has played in
    // }})).data as PlayerData //If an error is thrown its just probably that an username was used instead of an ID. Just ignore the error and continue.

    // if (!playerByID) {
    //     return
    // }
    return Player



    

}