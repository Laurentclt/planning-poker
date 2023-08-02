import { Injectable } from '@angular/core';
import {Card} from "../../shared/models/card.model";
import {Player} from "../../players/models/player.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private players = [
    new Player("lolo"),
    new Player("toto"),
    new Player("coco"),
    new Player("momo"),
    new Player("philippe")
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
