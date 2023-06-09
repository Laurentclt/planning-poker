import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Session} from "../../game/models/session.model";


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  firestore : Firestore = inject(Firestore);
  sessions$ : Observable<Session[]>
  sessionCollection = collection(this.firestore, "sessions")

  constructor() {
    this.sessions$ = collectionData(this.sessionCollection) as Observable<Session[]>
  }



  getInstanceDb() {
    return this.firestore
  }

  async createSession(session : Session) {
    return await addDoc(this.sessionCollection, {...session});
  }

}
