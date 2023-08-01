import {Roundstate} from "../enums/round-state.enum";
import {Player} from "../../players/models/player.model";

export class Round {
   id : string;
   subject : string;
   readonly roundStart : number;
   roundEnd? : number;
   readonly players : Player[];
   roundState : Roundstate;


  constructor(id: string, subject: string, roundStart: number, roundState: Roundstate) {
    this.id = id;
    this.subject = subject;
    this.roundStart = roundStart;
    this.players = [];
    this.roundState = roundState;
  }

}
