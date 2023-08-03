import {GameState} from "../enums/game-state.enum";
import {Round} from "../../../shared/models/round.model";
import {VotingSystem} from "./voting-system.model";
import {Player} from "../../players/models/player.model";
import {QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";


export class Session {
  id?: string;
  sessionName: string;
  sessionStart: number;
  sessionEnd?: number;
  votingSystem: VotingSystem;
  rounds: Round[];
  state: GameState;
  creator?: Player;
  players? : Player[]


  constructor(sessionName: string, sessionStart: number, votingSystem: VotingSystem, state: GameState) {
    this.sessionName = sessionName;
    this.sessionStart = sessionStart;
    this.votingSystem = votingSystem;
    this.rounds = [];
    this.state = state;

  }
}
// Firestore data converter
const sessionConverter = {
    toFirestore: (session : Session) => {
        return {
            sessionName: session.sessionName,
            sessionStart: session.sessionStart,
            votingSystem: session.votingSystem,
            rounds : session.rounds,
            state : session.state
        };
    },
    fromFirestore: (snapshot : QueryDocumentSnapshot, options : SnapshotOptions) => {
        const data = snapshot.data(options);
        return new Session(data['sessionName'], data['sessionStart'], data['votingSystem'], data['state']);
    }
};
