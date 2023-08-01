import {Card} from "../../shared/models/card.model";
import {Session} from "../../game/models/session.model";

export class Player {

  id : string;
  pseudo : string;
  card: Card;
  sessions : Session[];


  constructor(id: string, pseudo: string, card : Card) {
    this.id = id;
    this.pseudo = pseudo;
    this.card = card;
    this.sessions = [];
  }
}
