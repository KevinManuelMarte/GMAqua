import axios from 'axios'
import config from '../../../config.json'
import OfficialServerInfo from '../../types/OfficialServerInfo'
import ResumedOfficialServerInfo from '../../types/ResumedOfficialServerInfo'


export default async function getResumedOfficialServerInformation (serverName: string) {
    //First try to check if there is a server that its name 100% match with the provided argument.
    //if not, try to see if any server contains the provided argument as a substring
    const NoFilterServersList: any = await (await axios.get(`${config.ServersListURL}?filter[search]=${serverName}`)).data.data

    console.log(NoFilterServersList)

    const FilteredServersList: OfficialServerInfo [] = NoFilterServersList.filter((server: OfficialServerInfo) => server.relationships.game.data.id == 'arksa')
    let Server: ResumedOfficialServerInfo | undefined = new ResumedOfficialServerInfo();

    //For any possible mistakes, convert the names to lower case
    let ServerFound = FilteredServersList.find((Server:OfficialServerInfo) => Server.attributes.name.toLowerCase() == serverName.toLowerCase());


    if (!ServerFound) {
        ServerFound = FilteredServersList.find((Server:OfficialServerInfo) => Server.attributes.name.toLowerCase().includes(serverName.toLowerCase()));
    }


    Server.id =ServerFound?.id
    Server.serverName = ServerFound?.attributes.name
    Server.playersOnline = ServerFound?.attributes.players
    Server.maxPlayers = ServerFound?.attributes.maxPlayers
    Server.mapName = ServerFound?.attributes.details.map
    Server.day = 'No disponible por el momento, puede que en un futuro lo este'
    Server.ip = ServerFound?.attributes.ip
    Server.port = ServerFound?.attributes.port
    Server.platforms = ServerFound?.attributes.details.arksa_platforms



    if (!Server) return;
    if (!Server.serverName) return;

    return Server
    

}