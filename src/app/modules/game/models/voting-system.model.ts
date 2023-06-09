import {Card} from "../../shared/models/card.model";


export class VotingSystem {
  name : string;
  cards : Card[];

  constructor( name: string, cards: Card[]) {
    this.name = name;
    this.cards = cards;
  }
}
