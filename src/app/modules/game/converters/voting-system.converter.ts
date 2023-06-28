// Firestore data converter
import {FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";
import {VotingSystem} from "../models/voting-system.model";

export class votingSystemConverter implements FirestoreDataConverter<VotingSystem>  {
  toFirestore(votingSystem: VotingSystem)  {
    return {
      id: votingSystem.id,
      cards: votingSystem.cards,
      name: votingSystem.name,
    }
  }

  fromFirestore(snapshot: QueryDocumentSnapshot<any>, options: SnapshotOptions) : VotingSystem {
    const data = snapshot.data(options);
    return new VotingSystem(data.id, data.name, data.cards)
  }
}
