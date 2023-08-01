import {GameState} from "../enums/game-state.enum";
import {Round} from "../../shared/models/round.model";
import {VotingSystem} from "./voting-system.model";
import {Player} from "../../players/models/player.model";

export class Session {
  id?: string;
  sessionName: string;
  sessionStart: number;
  sessionEnd?: number;
  votingSystem: VotingSystem;
  rounds: Round[];
  state: GameState;
  creator?: Player;


  constructor(sessionName: string, sessionStart: number, votingSystem: VotingSystem, state: GameState) {
    this.sessionName = sessionName;
    this.sessionStart = sessionStart;
    this.votingSystem = votingSystem;
    this.rounds = [];
    this.state = state;
  }
}
