import {Roundstate} from "../enums/round-state.enum";

export class Round {
  id : number;
  votes : Vote[];
  roundState : Roundstate;


  constructor(id: number, votes: Vote[], roundState: Roundstate) {
    this.id = id;
    this.votes = votes;
    this.roundState = roundState;
  }
}
