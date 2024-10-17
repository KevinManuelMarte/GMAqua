import PlayedServerData from "./PlayedServerData"

export default class PlayerData {
    data: {
        type: string,
        id: string,
        attributes: {
            id: string,
            name: string,
            private: false,
            positiveMatch: false,
            createdAt: string, // example: 2018-05-16T17:02:15.549Z
            updatedAt: string // example: 2018-05-16T17:02:15.549Z
        },
        relationships: {
            
        }
    }
    included: PlayedServerData[
    ]
}