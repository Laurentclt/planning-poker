import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CardService {

    constructor() {
    }
    showAllCards(): void {
        // used when display results => show all users' card
    }

    selectCard(): void {
        // used when player select a card => change player's card value in db
    }

    hideAllCards(): void {
        // used when a new round begin => hide all users card
    }

}
