import {Component, OnInit} from '@angular/core';
import {Card} from "../../../shared/models/card.model";
import {GameService} from "../../services/game.service";
import {Player} from "../../../players/models/player.model";
import {RoundState} from "../../enums/round-state.enum";
import {DatabaseService} from "../../../core/services/database.service";

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.scss']
})
export class GameSessionComponent implements OnInit{
  cards! : Card[];
  players! : Player[];
  players3! : Player[];
  message! : string;
  roundState! : RoundState;
  constructor(private databaseService : DatabaseService, private gameService : GameService) {
  }

  ngOnInit(): void {
    this.roundState = RoundState.UserDidNotVote;
    this.cards = this.databaseService.getPlayingCards();
    this.players = this.gameService.getPlayers();
    this.players3 = this.players.slice(-3);
  }


    protected readonly RoundState = RoundState;
}
