import {GameState} from "../enums/game-state.enum";
import {Round} from "../../../shared/models/round.model";
import {VotingSystem} from "./voting-system.model";
import {Player} from "../../players/models/player.model";



export class Session {
  id?: string;
  name: string;
  sessionStart: number;
  sessionEnd?: number;
  votingSystem: VotingSystem;
  state: GameState;
  players? : Player[];


  constructor(name: string, votingSystem: VotingSystem, state: GameState = GameState.Created) {
    this.name = name;
    this.sessionStart = Date.now();
    this.votingSystem = votingSystem;
    this.state = state;
  }
}

