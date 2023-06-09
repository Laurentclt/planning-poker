import {GameState} from "../enums/game-state.enum";
import {Round} from "../../shared/models/round.model";
import {VotingSystem} from "./voting-system.model";

export class Session {
  id : number;
  sessionName : string;
  sessionStart : number;
  sessionEnd : number;
  votingSystem : VotingSystem;
  rounds : Round[];
  state : GameState;


  constructor(id: number, sessionName : string, sessionStart: number, sessionEnd: number, votingSystem: VotingSystem, rounds : Round[], state: GameState) {
    this.id = id;
    this.sessionName = sessionName;
    this.sessionStart = sessionStart;
    this.sessionEnd = sessionEnd;
    this.votingSystem = votingSystem;
    this.rounds = rounds;
    this.state = state;
  }
}
