import {inject, Injectable} from '@angular/core';
import {
    addDoc,
    collection,
    collectionData,
    doc, docData,
    Firestore,
    getDoc, onSnapshot, updateDoc,
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Session} from "../../modules/game/models/session.model";
import {VotingSystem} from "../../modules/game/models/voting-system.model";

import {StateService} from "./state.service";
import {Player} from "../../modules/players/models/player.model";
import {Router} from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    firestore: Firestore = inject(Firestore);

    constructor(private stateService: StateService, private router: Router) {
    }

    createSession(session: Session): Promise<string>  {
        let colRef = collection(this.firestore, 'sessions')
        return addDoc(colRef, {...session})
            .then(doc => {
                docData(doc)
                    .subscribe(data => {
                        this.stateService.session = data as Session
                        this.stateService.session.id = doc.id
                        console.log("state session :", this.stateService.session)
                    })
                return doc.id
            })
    }

    addPlayer(player: Player) : Promise<string> {
        let colRef = collection(this.firestore, "sessions", this.router.url, "players")
        return addDoc(colRef, {...player})
            .then(doc =>  {
                docData(doc)
                        .subscribe(data => {
                            this.stateService.playerConnected = data as Player
                            this.stateService.playerConnected.id = doc.id
                            console.log("state playerConnected :", this.stateService.playerConnected)
                        })
                return doc.id
                }
            )
    }

    getVotingSystems$(): Observable<VotingSystem[]> {
        let colRef = collection(this.firestore, "votingSystems")
        return collectionData(colRef) as Observable<VotingSystem[]>
    }

   getSessionByUrl(url : string)  {
        let docRef = doc(this.firestore, 'sessions', url)
        docData(docRef).subscribe(data => {
            this.stateService.session = data as Session
            this.stateService.session.id = docRef.id
            console.log("state session :", this.stateService.session)
        })
        return getDoc(docRef).then(data => {
            let session = data.data() as Session
            session.id = data.id
            return session
        })
    }


    getActivePlayers$(id: string) {
        let colRef = collection(this.firestore, "sessions", id, "players")
        return collectionData(colRef) as Observable<Player[]>
    }

    async setPlayerInactive() {
        if (this.stateService.playerConnected && this.stateService.session) {
            if (this.stateService.session.id && this.stateService.playerConnected.id) {
                let sessionId = this.stateService.session.id
                let playerId = this.stateService.playerConnected.id

                let docRef = doc(this.firestore, "sessions", sessionId, "players", playerId)
                return await updateDoc(docRef, {isActive: false})
            }
        } else {
            return new Error("couldn't set player to inactive")
        }
    }
}
