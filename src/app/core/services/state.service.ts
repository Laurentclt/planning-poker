import {Injectable} from '@angular/core';
import {Session} from "../../modules/game/models/session.model";
import {Player} from "../../modules/players/models/player.model";
import {GameState} from "../../modules/game/enums/game-state.enum";
import {RoundState} from "../../modules/game/enums/round-state.enum";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StateService {
    session?: Session;
    playerConnected?: Player;
    roundState?: RoundState
    roundCount?: number;

    constructor() {
    }
}
