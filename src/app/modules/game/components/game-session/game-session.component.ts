import {Component, OnInit} from '@angular/core';
import {Card} from "../../../../shared/models/card.model";
import {Player} from "../../../players/models/player.model";
import {RoundState} from "../../enums/round-state.enum";
import {StateService} from "../../../../core/services/state.service";
import {Router} from "@angular/router";
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
        this.players$ = this.databaseService.getActivePlayers$(this.router.url) as Observable<Player[]>
        this.players$.subscribe(data => data.filter((value, index, array) => {
            if (index === 1 || index === 5 || index === 7 || index === 9) {
                this.playersTop.push(array[index])
            }else if (index === 2 || index === 10 ) {
                this.playersLeft.push(array[index])
            } else if (index === 0 || index === 4 || index === 6 || index === 8) {
                this.playersBottom.push(array[index])
            } else if (index === 3 || index === 11) {
                this.playersRight.push(array[index])
            }


        }  ))
    }


    getModalData(data: {name : string}) {
        let player = new Player(data.name)
        this.databaseService.addPlayer(player)
            .then(() => this.stateService.playerConnected = player) // add player to state manager
    }
}
