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
    session! : Session;
    constructor(private stateService : StateService) {
    }


    getInstanceDb() {
        return this.firestore
    }

    async createSession(session: Session) {
        let createdSession = await addDoc(collection(this.firestore, "sessions"), {...session});
        this.stateService.session = new Session(createdSession.id, session.sessionName, session.sessionStart, session.votingSystem, session.state)
        return createdSession
    }

    getVotingSystems$() {
        return collectionData( collection(this.firestore, "votingSystems")) as Observable<VotingSystem[]>
    }
    getPlayingCards() : Card[] {
        if (!this.session) {
            throw new Error("can't get cards from null session")
        } else {
            return this.session.votingSystem.cards
        }

    }
}
