import {Injectable} from '@angular/core';
import {Session} from "../../modules/game/models/session.model";
import {Player} from "../../modules/players/models/player.model";
import {RoundState} from "../../modules/game/enums/round-state.enum";

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
