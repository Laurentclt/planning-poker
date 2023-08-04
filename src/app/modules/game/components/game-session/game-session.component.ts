import {Component, OnInit} from '@angular/core';
import {Card} from "../../../../shared/models/card.model";
import {GameService} from "../../services/game.service";
import {Player} from "../../../players/models/player.model";
import {RoundState} from "../../enums/round-state.enum";
import {StateService} from "../../../../core/services/state.service";
import {Router} from "@angular/router";
import {Modal} from "../../../../shared/models/modal.model";
import {DatabaseService} from "../../../../core/services/database.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-game-session',
    templateUrl: './game-session.component.html',
    styleUrls: ['./game-session.component.scss']
})
export class GameSessionComponent implements OnInit {
    votingCards: Card[] = [];
    players$! : Observable<Player[]>
    message!: string;
    roundState!: RoundState;
    protected readonly RoundState = RoundState;

    constructor(private router: Router, private databaseService: DatabaseService, public stateService: StateService) {
    }

    ngOnInit(): void {
        this.stateService.url = this.router.url
        this.databaseService.getSessionById(this.router.url)
            .then(session => {
                this.stateService.session = session
                this.databaseService.getSystemValues().forEach(value => {
                    this.votingCards.push(new Card(value))
                })

            })
            .catch(err => console.log(err))
        this.roundState = RoundState.UserDidNotVote;
        this.players$ = this.databaseService.getActivePlayers$(this.router.url) as Observable<Player[]>
    }


    getModalData(data: {name : string}) {
        let player = new Player(data.name)
        this.databaseService.addPlayer(player)
            .then(() => this.stateService.playerConnected = player) // add player to state manager
    }
}
