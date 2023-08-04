import {Injectable} from '@angular/core';
import {Session} from "../../modules/game/models/session.model";
import {Player} from "../../modules/players/models/player.model";
import {GameState} from "../../modules/game/enums/game-state.enum";
import {RoundState} from "../../modules/game/enums/round-state.enum";

@Injectable({
    providedIn: 'root'
})
export class StateService {
    session?: Session;
    players: Player[] = [];
    url?: string;
    gameState?: GameState;
    playerConnected?: Player;
    roundState?: RoundState

    constructor() {
    }
}
