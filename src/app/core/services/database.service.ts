import {inject, Injectable} from '@angular/core';
import {
    addDoc,
    collection,
    collectionData, deleteDoc,
    doc, docData, documentId,
    Firestore,
    getDoc, setDoc, updateDoc,
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Session} from "../../modules/game/models/session.model";
import {VotingSystem} from "../../modules/game/models/voting-system.model";

import {StateService} from "./state.service";
import {Player} from "../../modules/players/models/player.model";
import {Router} from "@angular/router";
import {GameState} from "../../modules/game/enums/game-state.enum";


@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    firestore: Firestore = inject(Firestore);

    constructor(private stateService: StateService, private router: Router) {
    }

    createSession(session: Session): Promise<string> {
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

    async addPlayer(player: Player) {
        // get collection reference of players
        let colRef = collection(this.firestore, "sessions", this.router.url, "players")
        // check if player is already created
        if (player.id) {
            let docRef = doc(colRef, player.id);
            getDoc(docRef)
                // if player already played in this game session
                .then(data => {
                    console.log('reactive players')
                    return updateDoc(docRef, {
                        isActive: true
                    })
                })
                // if player did not played in this session before
                .catch(error => {
                    console.log('add player to the session')
                    return setDoc(doc(colRef, player.id), {...player})
                })
            // if players has not been created before
        } else {
            let doc = await addDoc(colRef, {...player});
            docData(doc)
                .subscribe(data => {
                    this.stateService.playerConnected = data as Player
                    this.stateService.playerConnected.id = doc.id
                })
            ;
        }
    }

    getVotingSystems$(): Observable<VotingSystem[]> {
        let colRef = collection(this.firestore, "votingSystems")
        return collectionData(colRef) as Observable<VotingSystem[]>
    }

    getSessionByUrl(url: string) {
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

    getPlayerById(id: string) {
        let docRef = doc(this.firestore, "sessions", this.router.url, "players", id)
        return getDoc(docRef).then(data => {
            let player = data.data() as Player
            player.id = data.id
            return player
        })
    }

    getActivePlayers$(id: string) {
        let colRef = collection(this.firestore, "sessions", id, "players")
        return collectionData(colRef) as Observable<Player[]>
    }
    updateSessionState(id: string, state : GameState) {
        let docRef = doc(this.firestore, 'sessions', id)
        updateDoc(docRef, {
            state : state
        })
    }

    async setPlayerInactive() {
        if (!this.stateService.playerConnected?.id) {
            throw new Error("there is no current connected player")
        }
        if (!this.stateService.session?.id) {
            throw new Error("there is no current session active")
        } else {
            let sessionId = this.stateService.session.id
            let playerId = this.stateService.playerConnected.id

            let docRef = doc(this.firestore, "sessions", sessionId, "players", playerId)
            return await updateDoc(docRef, {isActive: false})
        }

    }
}
