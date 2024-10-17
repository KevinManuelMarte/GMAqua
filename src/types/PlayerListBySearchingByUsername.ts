import PlayedServerData from "./PlayedServerData";
import PlayerDataByUsername from "./PlayerDataByUsername";

export default class PlayerListBySearchingByUsername {
    data: PlayerDataByUsername []
    links: {
        next: string
    }
    included: PlayedServerData []
}