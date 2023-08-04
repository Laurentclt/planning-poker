import {inject, Injectable} from '@angular/core';
import {
    addDoc,
    arrayUnion,
    collection,
    collectionData,
    doc,
    Firestore,
    getDoc, getDocs,
    updateDoc
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Session} from "../../modules/game/models/session.model";
import {VotingSystem} from "../../modules/game/models/voting-system.model";
import {Card} from "../../shared/models/card.model";
import {StateService} from "./state.service";
import {Player} from "../../modules/players/models/player.model";
import {orderByValue} from "@angular/fire/database";


@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    firestore: Firestore = inject(Firestore);
    constructor(private stateService : StateService) {
    }

    async createSession(session: Session) {
        return await addDoc(collection(this.firestore, "sessions"), {...session});
    }
    async addPlayer(player: Player) {
        if (this.stateService.session?.id)
        return await updateDoc(doc(this.firestore, "sessions", this.stateService.session.id ),  {
            players : arrayUnion(player)
        })

    }

    getVotingSystems$() : Observable<VotingSystem[]>  {
        let colRef = collection(this.firestore, "votingSystems")
        return collectionData(colRef) as Observable<VotingSystem[]>
    }
    getSystemValues() : number[] {
        if (!this.stateService.session) {
            throw new Error("can't get cards from null session")
        } else {
            return this.stateService.session.votingSystem.values
        }

    }

    async getSessionById(url: string) {
        const docRef = doc(this.firestore, "sessions", url);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data()
            console.log("Document data:", docSnap.data());
            return new Session(data['sessionName'], data['votingSystem'], data['state'])
        } else {
            // docSnap.data() will be undefined in this case
            throw new Error("No such document")
        }
    }


}
