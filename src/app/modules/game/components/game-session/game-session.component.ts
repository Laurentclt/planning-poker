import {Component, OnInit} from '@angular/core';
import {Card} from "../../../../shared/models/card.model";
import {Player} from "../../../players/models/player.model";
import {RoundState} from "../../enums/round-state.enum";
import {StateService} from "../../../../core/services/state.service";
import {Router} from "@angular/router";
import {DatabaseService} from "../../../../core/services/database.service";
import {distinctUntilChanged, Observable} from "rxjs";
import  { isEqual } from 'lodash';

@Component({
    selector: 'app-game-session',
    templateUrl: './game-session.component.html',
    styleUrls: ['./game-session.component.scss']
})
export class GameSessionComponent implements OnInit {
    votingCards: Card[] = [];
    playersTop : Player[] = []
    playersLeft : Player[] = []
    playersRight : Player[] = []
    playersBottom : Player[] = []
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
        this.getPlayersAndPlaceThem()
    }


    getModalData(data: {name : string}) {
        let player = new Player(data.name)
        this.databaseService.addPlayer(player)
            .then(() => this.stateService.playerConnected = player) // add player to state manager
    }

    private getPlayersAndPlaceThem() {

            this.placePlayers(this.getPlayers())

    }

    private getPlayers() {
        return this.databaseService.getActivePlayers$(this.router.url)
            .pipe(distinctUntilChanged((prev, current) => {
                return isEqual(prev, current)
            }))
    }

    private placePlayers(players: Observable<Player[]>) {
        players.subscribe(data =>  {
            this.playersLeft = []
            this.playersTop = []
            this.playersRight = []
            this.playersBottom = []
            data.forEach((player, index, array) => {
                if ((index  % 6 == 0) || (index % 6 == 4)) {
                    this.playersBottom.push(player);
                }
                if ((index % 6 == 1) || (index % 6 == 5)) {
                    this.playersTop.push(player);
                }
                if (index % 6 == 2) {
                    this.playersRight.push(player);
                }
                if (index % 6 == 3) {
                    this.playersLeft.push(player);
                }
            })
        })
    }
}
