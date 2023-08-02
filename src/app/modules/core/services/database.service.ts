import {inject, Injectable} from '@angular/core';
import {
    addDoc,
    arrayUnion,
    collection,
    collectionData,
    doc,
    Firestore,
    getDoc,
    updateDoc
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Session} from "../../game/models/session.model";
import {VotingSystem} from "../../game/models/voting-system.model";
import {Card} from "../../shared/models/card.model";
import {StateService} from "./state.service";
import {Player} from "../../players/models/player.model";


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

    // async create<T>(data: T, collectionName : string ) {
    //     return await addDoc(collection(this.firestore, collectionName), {...data});
    // }
    async createSession(session: Session) {
        return await addDoc(collection(this.firestore, "sessions"), {...session});
    }
    async addPlayer(player: Player) {
        if (this.stateService.session?.id)
        return await updateDoc(doc(this.firestore, "sessions", this.stateService.session.id ),  {
            players : arrayUnion(player)
        })

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
