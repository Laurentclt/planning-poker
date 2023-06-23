import {GameState} from "../enums/game-state.enum";
import {Round} from "../../shared/models/round.model";
import {VotingSystem} from "./voting-system.model";
import {Player} from "../../players/models/player.model";

export class Session {
  private _id : string;
  private readonly _sessionName : string;
  private readonly _sessionStart : number;
  private _sessionEnd? : number;
  private _votingSystem : VotingSystem;
  private readonly _rounds : Round[];
  private _state : GameState;
  private _creator? : Player;


  constructor(id : string, sessionName: string, sessionStart: number, votingSystem: VotingSystem, state: GameState) {
    this._id = id;
    this._sessionName = sessionName;
    this._sessionStart = sessionStart;
    this._votingSystem = votingSystem;
    this._rounds = [];
    this._state = state;
  }

  get sessionName(): string {
    return this._sessionName;
  }

  get sessionStart(): number {
    return this._sessionStart;
  }

  get sessionEnd(): number | undefined {
    return this._sessionEnd;
  }

  get votingSystem(): VotingSystem {
    return this._votingSystem;
  }

  get rounds(): Round[] {
    return this._rounds;
  }

  get state(): GameState {
    return this._state;
  }

  get creator(): Player | undefined {
    return this._creator;
  }

  set votingSystem(value: VotingSystem) {
    this._votingSystem = value;
  }

  set state(value: GameState) {
    this._state = value;
  }

  set creator(value: Player | undefined) {
    this._creator = value;
  }

  addRound(value : Round) {
    this.rounds.push(value);
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
