import {Injectable} from '@angular/core';
import {Session} from "../../game/models/session.model";
import {Player} from "../../players/models/player.model";
import {GameState} from "../../game/enums/game-state.enum";
import {RoundState} from "../../game/enums/round-state.enum";

@Injectable({
    providedIn: 'root'
})
export class StateService {
    session? : Session;
    players : Player[] = [];
    url? : string;
    gameState? : GameState;
    playerConnected? : Player;
    roundState? : RoundState

    constructor() {
    }
}
