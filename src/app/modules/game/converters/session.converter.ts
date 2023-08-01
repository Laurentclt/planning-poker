// Firestore data converter
import {FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";
import {Session} from "../models/session.model";

export class sessionConverter implements FirestoreDataConverter<Session>  {
  toFirestore(session: Session)  {
    return {
      id: session.id,
      name: session.sessionName,
      start: session.sessionStart,
      votingSystem : session.votingSystem,
      rounds : session.rounds,
      state : session.state
    }
  }

  fromFirestore(snapshot: QueryDocumentSnapshot<any>, options: SnapshotOptions) : Session {
    const data = snapshot.data(options);
    return new Session( data.name, data.start, data.votingSystem, data.votingSystem, data.start)
  }
}
