import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore, getDocs} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Session} from "../../game/models/session.model";
import {VotingSystem} from "../../game/models/voting-system.model";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  firestore : Firestore = inject(Firestore);
  sessions$ : Observable<Session[]>;
  votingSystems$ : Observable<VotingSystem[]>
  sessionCollection = collection(this.firestore, "sessions")
  votingSystemCollection = collection(this.firestore, "votingSystems")
  constructor() {
    this.sessions$ = collectionData(this.sessionCollection) as Observable<Session[]>
    this.votingSystems$ = collectionData(this.votingSystemCollection )as Observable<VotingSystem[]>
  }



  getInstanceDb() {
    return this.firestore
  }

  async createSession(session : Session) {
    return await addDoc(this.sessionCollection, {...session});
  }

  getVotingSystems$() {
    return this.votingSystems$
  }

}
