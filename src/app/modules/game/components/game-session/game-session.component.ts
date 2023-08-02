import {Component, OnInit} from '@angular/core';
import {Card} from "../../../shared/models/card.model";
import {GameService} from "../../services/game.service";
import {Player} from "../../../players/models/player.model";
import {RoundState} from "../../enums/round-state.enum";
import {DatabaseService} from "../../../core/services/database.service";
import {StateService} from "../../../core/services/state.service";
import {Router} from "@angular/router";
import {Modal} from "../../../shared/models/modal.model";

@Component({
    selector: 'app-game-session',
    templateUrl: './game-session.component.html',
    styleUrls: ['./game-session.component.scss']
})
export class GameSessionComponent implements OnInit {
    cards!: Card[];
    players!: Player[];
    players3!: Player[];
    message!: string;
    roundState!: RoundState;
    modal: Modal = {
        title : "Enter your gaming name",
        fields: ["name"],
        successBtn: "Save",
    } ;
    protected readonly RoundState = RoundState;
    constructor(private router : Router, private databaseService: DatabaseService, private gameService: GameService, public stateService: StateService) {
    }

    ngOnInit(): void {
        this.databaseService.getSessionById(this.router.url)
            .then(session => {
                    this.stateService.session = session
                    this.cards = this.databaseService.getPlayingCards()
            })
            .catch(err => console.log(err))

        this.roundState = RoundState.UserDidNotVote;

        this.players = this.gameService.getPlayers();
        this.players3 = this.players.slice(-3);
    }


    getModalData(event : Event) {
        console.log(event)
        let player = new Player(event.type)
        this.databaseService.addPlayer(player).then(r => this.stateService.playerConnected = player)

    }
}
