import {Card} from "../../shared/models/card.model";


export class VotingSystem {
  private _id : string;
  private readonly _name : string;
  private readonly _cards : Card[];

  constructor(id : string, name: string, cards: Card[]) {
    this._id = id;
    this._name = name;
    this._cards = cards;
  }

  get name(): string {
    return this._name;
  }

  get cards(): Card[] {
    return this._cards;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
