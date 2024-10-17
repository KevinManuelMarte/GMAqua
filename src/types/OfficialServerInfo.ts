export default class OfficialServerInfo         {
    type: string
    id: string
    attributes: {
        id: string
        name: string
        address: string
        ip: string
        port: number
        players: number
        maxPlayers: number
        rank: number
        location: [
            number,
            number
        ]
        status: string
        details: {
            modLinks: string[]
            arksa_platforms: string[
            ]
            modded: boolean
            version: string
            pve: boolean
            password: boolean
            time_i: number
            official: boolean
            modIds: string[
            ]
            map: string
            arksa_console: boolean
            crossplay: boolean
            modNames: string[
            ]
        }
        private: boolean
        createdAt: string
        updatedAt: string
        portQuery: number
        country: string
    }
    relationships: {
        game: {
            data: {
                type: string
                id: string
            }
        }
    }
}