export default class PlayedServerData {
    type: string
    id: string
    attributes: {
        id: string
        name: string
        address: string | null;
        ip: string
        port: number
        players: number
        maxPlayers: number
        rank: number
        location: number[]
        status: string
        details: {
            modIds: string[]
            modHashes: string[]
            map: string
            time: string
            time_i: string
            official: boolean
            gamemode: string
            modNames: string[]
            pve: boolean
            modded: boolean
            crossplay: boolean
            session_flags: 1707
            serverSteamId: 90203795799967755
        }
        private: boolean
        createdAt: string
        updatedAt: string
        portQuery: number
        country: string
        queryStatus: string
    }
    relationships: {
        game: {
            data: {
                type: string
                id: string
            }
        }
    }
    meta: {
        timePlayed: number
        firstSeen: string
        lastSeen: string
        online: boolean
    }
}