import {Card} from "../../shared/models/card.model";


export class VotingSystem {
  id : number;
  name : string;
  cards : Card[];

  constructor(id: number, name: string, cards: Card[]) {
    this.id = id;
    this.name = name;
    this.cards = cards;
  }
}
