import {Card} from "../../../shared/models/card.model";

export class Player {
    id? : string;
    pseudo: string;
    card: Card;
    isActive : boolean;


    constructor(pseudo: string) {
        this.pseudo = pseudo;
        this.card = {
            value : null,
            isHidden : false
        }
        this.isActive = true;
    }
}
