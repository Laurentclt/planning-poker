import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Session} from "../../game/models/session.model";
import {VotingSystem} from "../../game/models/voting-system.model";
import {Card} from "../../shared/models/card.model";
import {StateService} from "./state.service";


@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    firestore: Firestore = inject(Firestore);
    constructor(private stateService : StateService) {
    }


    getInstanceDb() {
        return this.firestore
    }

    async createSession(session: Session) {
        return await addDoc(collection(this.firestore, "sessions"), {...session});
    }

    getVotingSystems$() {
        return collectionData( collection(this.firestore, "votingSystems")) as Observable<VotingSystem[]>
    }
    getPlayingCards() : Card[] {
        if (!this.stateService.session) {
            throw new Error("can't get cards from null session")
        } else {
            return this.stateService.session.votingSystem.cards
        }

    }
}
