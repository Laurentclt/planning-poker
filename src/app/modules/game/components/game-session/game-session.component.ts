import {Component, OnInit} from '@angular/core';
import {Card} from "../../../shared/models/card.model";
import {GameService} from "../../services/game.service";
import {Player} from "../../../players/models/player.model";
import {TableState} from "../../enums/table-state.enum";

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
  tableState! : TableState;
  protected readonly TableState = TableState;
  constructor(private gameService : GameService) {
  }

  ngOnInit(): void {
    this.tableState = this.TableState.UserDidNotVote;
    this.cards = this.gameService.getCards();
    this.players = this.gameService.getPlayers();
    this.players3 = this.players.slice(-3);
  }



}
