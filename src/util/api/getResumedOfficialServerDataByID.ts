import axios from 'axios'
import config from '../../../config.json'
import OfficialServerInfo from '../../types/OfficialServerInfo'
import ResumedOfficialServerInfo from '../../types/ResumedOfficialServerInfo'


export default async function getResumedOfficialServerInformationByID (serverID: string) {

    if (serverID.match(/^[0-9]+$/) == null) {
        return
    }
    //First try to check if there is a server that its name 100% match with the provided argument.
    //if not, try to see if any server contains the provided argument as a substring
    const ServerFound: any = await (await axios.get(`${config.ServersListURL}/${serverID}`)).data.data

    let Server: ResumedOfficialServerInfo | undefined = new ResumedOfficialServerInfo();

    //For any possible mistakes, convert the names to lower case
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

    console.log('DID WE GET HERE')
    return Server
    

}