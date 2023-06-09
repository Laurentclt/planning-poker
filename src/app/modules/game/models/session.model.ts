import {GameState} from "../enums/game-state.enum";
import {Round} from "../../shared/models/round.model";
import {VotingSystem} from "./voting-system.model";

export class Session {
  sessionName : string;
  sessionStart : number;
  private _sessionEnd? : number;
  votingSystem : VotingSystem;
  rounds : Round[];
  state : GameState;


  constructor( sessionName: string, sessionStart: number, votingSystem: VotingSystem, rounds: Round[], state: GameState) {
    this.sessionName = sessionName;
    this.sessionStart = sessionStart;
    this.votingSystem = votingSystem;
    this.rounds = rounds;
    this.state = state;
  }


  get sessionEnd(): number | undefined {
    return this._sessionEnd;
  }

  set sessionEnd(value: number | undefined) {
    this._sessionEnd = value;
  }
}
