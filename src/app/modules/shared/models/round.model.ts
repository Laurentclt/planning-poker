import {Roundstate} from "../enums/round-state.enum";
import {Player} from "../../players/models/player.model";

export class Round {
  private _id : string;
  private _subject : string;
  private readonly _roundStart : number;
  private _roundEnd? : number;
  private readonly _players : Player[];
  private _roundState : Roundstate;


  constructor(id: string, subject: string, roundStart: number, roundState: Roundstate) {
    this._id = id;
    this._subject = subject;
    this._roundStart = roundStart;
    this._players = [];
    this._roundState = roundState;
  }


  get id(): string {
    return this._id;
  }

  get subject(): string {
    return this._subject;
  }

  get roundStart(): number {
    return this._roundStart;
  }

  get roundEnd(): number | undefined {
    return this._roundEnd;
  }

  get players(): Player[] {
    return this._players;
  }

  get roundState(): Roundstate {
    return this._roundState;
  }


  set subject(value: string) {
    this._subject = value;
  }

  set roundEnd(value: number | undefined) {
    this._roundEnd = value;
  }

  set roundState(value: Roundstate) {
    this._roundState = value;
  }

  set id(value: string) {
    this._id = value;
  }
}
