import {Roundstate} from "../enums/round-state.enum";
import {Player} from "../../players/models/player.model";

export class Round {
  id : number;
  subject : string;
  roundStart : number;
  roundEnd : number;
  players : Player[];
  roundState : Roundstate;


  constructor(id: number, subject: string, roundStart: number, roundEnd: number, players: Player[], roundState: Roundstate) {
    this.id = id;
    this.subject = subject;
    this.roundStart = roundStart;
    this.roundEnd = roundEnd;
    this.players = players;
    this.roundState = roundState;
  }
}
