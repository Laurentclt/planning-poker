import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, doc, Firestore, getDoc} from "@angular/fire/firestore";
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

    async getSessionById(url: string) {
        const docRef = doc(this.firestore, "sessions", url);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data()
            console.log("Document data:", docSnap.data());
            return new Session(data['sessionName'], data['sessionStart'], data['votingSystem'], data['state'])
        } else {
            // docSnap.data() will be undefined in this case
            throw new Error("No such document")
        }
    }
}
