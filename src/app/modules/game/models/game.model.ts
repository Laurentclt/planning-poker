import {GameState} from "../enums/game-state.enum";

export class Game {
  id : number;
  players : Player[];
  cards : Card[];
  state : GameState;


  constructor(id: number, players: Player[], cards: Card[], state: GameState) {
    this.id = id;
    this.players = players;
    this.cards = cards;
    this.state = state;
  }
}
