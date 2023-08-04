import {Roundstate} from "../enums/round-state.enum";
import {Player} from "../../modules/players/models/player.model";

export class Round {
    id : string;
    subject : string;
    roundStart : number;
    roundEnd? : number;
    players : Player[];
    roundState : Roundstate;


    constructor(id: string, subject: string, roundState: Roundstate = Roundstate.Running) {
        this.id = id;
        this.subject = subject;
        this.roundStart = Date.now()
        this.players = [];
        this.roundState = roundState;
    }

}
