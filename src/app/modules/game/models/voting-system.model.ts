import {Card} from "../../shared/models/card.model";


export class VotingSystem {
    id: string;
    name: string;
    cards: Card[];

    constructor(id: string, name: string, cards: Card[]) {
        this.id = id;
        this.name = name;
        this.cards = cards;
    }

    getFullName(): string {
        let name: string = "";
        name += this.name
        name += "( "
        this.cards.forEach(card => name += card.value + ", ")
        name += " )"
        return name;
    }


}
