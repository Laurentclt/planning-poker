import { Injectable } from '@angular/core';
import {Card} from "../../shared/models/card.model";
import {Player} from "../../players/models/player.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private players = [
    new Player("1","lolo", new Card("20", 0, false)),
    new Player("2","toto", new Card("21", 2, true)),
    new Player("3","coco", new Card("22", 4, false)),
    new Player("4","momo", new Card("23", 5, true)),
    new Player("5","philippe", new Card("24", 0, true))
  ]
  constructor( ) { }



  initGame() {

  }
  getVotingSystem() {

  }
  addPlayer() {

  }

  removePlayer() {

  }

  getPlayers() {
    return this.players;
  }
}
