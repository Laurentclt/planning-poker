import {Card} from "../../shared/models/card.model";
import {Session} from "../../game/models/session.model";

export class Player {

  private _id : string;
  private _pseudo : string;
  private _card: Card;
  private readonly _sessions : Session[];


  constructor(id: string, pseudo: string, card : Card) {
    this._id = id;
    this._pseudo = pseudo;
    this._card = card;
    this._sessions = [];
  }

  setCard(card : Card) {
    this._card = card;
  }

  get id(): string {
    return this._id;
  }

  get pseudo(): string {
    return this._pseudo;
  }

  get card(): Card {
    return this._card;
  }

  get sessions(): Session[]  {
    return this._sessions;
  }

  addSession() {
    this._sessions.push()
  }

  set id(value: string) {
    this._id = value;
  }

  set pseudo(value: string) {
    this._pseudo = value;
  }

  set card(value: Card) {
    this._card = value;
  }
}
