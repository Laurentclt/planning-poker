import {Card} from "../../../shared/models/card.model";
import {Session} from "../../game/models/session.model";

export class Player {
    pseudo: string;
    card: Card;
    sessions: Session[];


    constructor(pseudo: string) {
        this.pseudo = pseudo;
        this.sessions = [];
        this.card = {
            value : undefined,
            isHidden : false
        }
    }
}
