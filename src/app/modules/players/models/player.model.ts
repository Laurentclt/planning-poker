import {Card} from "../../../shared/models/card.model";

export class Player {
    pseudo: string;
    card: Card;


    constructor(pseudo: string) {
        this.pseudo = pseudo;
        this.card = {
            value : null,
            isHidden : false
        }
    }
}
