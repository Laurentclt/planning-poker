import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Card} from "../../../../shared/models/card.model";
import {Player} from "../../../players/models/player.model";
import {RoundState} from "../../enums/round-state.enum";
import {StateService} from "../../../../core/services/state.service";
import {Router} from "@angular/router";
import {DatabaseService} from "../../../../core/services/database.service";
import {distinctUntilChanged, Observable, takeWhile} from "rxjs";
import {isEqual} from 'lodash';
import {Session} from "../../models/session.model";
import {GameState} from "../../enums/game-state.enum";

@Component({
    selector: 'app-game-session',
    templateUrl: './game-session.component.html',
    styleUrls: ['./game-session.component.scss']
})
export class GameSessionComponent implements OnInit, OnDestroy {
    votingCards: Card[] = [];
    playersTop: Player[] = [];
    playersLeft: Player[] = [];
    playersRight: Player[] = [];
    playersBottom: Player[] = [];
    message!: string;
    messageSessionClose!: string;
    roundState!: RoundState;
    protected readonly RoundState = RoundState;
    playerConnected!: Player;


    constructor(private router: Router, private databaseService: DatabaseService, public stateService: StateService) {

    }

    ngOnInit(): void {
        let url = this.router.url;
        this.databaseService.getSessionByUrl(url).then(session => {
            if (session.state == GameState.Close) {
                this.messageSessionClose = "This session is closed."
            } else {
                this.roundState = RoundState.UserDidNotVote;
                this.placePlayers(this.getPlayers()) // get players and place them
                this.databaseService.getSessionByUrl(url).then(session => this.setVotingSystem(session))
                if (this.stateService.playerConnected) {
                    this.databaseService.addPlayer(this.stateService.playerConnected).then(() => {
                        this.playerConnected =  this.stateService.playerConnected!
                    })
                }
            }
        })

    }


    private setVotingSystem(session: Session) {
        session.votingSystem.values.forEach(value => {
            this.votingCards.push(new Card(value))
        })
    }

    getModalData(data: { name: string }) {
        let player = new Player(data.name)
        this.databaseService.addPlayer(player).then(() => {
            this.playerConnected =  this.stateService.playerConnected!
        })
    }


    private getPlayers() {
        return this.databaseService.getActivePlayers$(this.router.url)
            .pipe(distinctUntilChanged((prev, current) => {
                return isEqual(prev, current)
            }))
    }

    private placePlayers(players: Observable<Player[]>) {
        players.subscribe(data => {
            this.playersLeft = []
            this.playersTop = []
            this.playersRight = []
            this.playersBottom = []
            data.forEach((player, index, array) => {
                if (player.isActive) {
                    if ((index % 6 == 0) || (index % 6 == 4)) {
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
                }
            })
        })
    }

    private removePlayerFromView(player: Player) {
        if (player != this.stateService.playerConnected) {
            throw new Error("can't remove other player")
        }
        let array = [this.playersLeft, this.playersRight, this.playersTop, this.playersBottom]
        for (let i = 0; i < array.length; i++) {
            if (this.removePlayerFromArray(array[i], player)) {
                break;
            }
        }
    }

    private removePlayerFromArray(array: Player[], player: Player): boolean {
        if (array.includes(player)) {
            let index = array.indexOf(player)
            array.splice(index, 1)
            return true;
        }
        return false;
    }

    private checkGameState(url: string) {
        return this.databaseService.getActivePlayers$(url).pipe(
            takeWhile(value => value.length > 0))
            .subscribe(
                data => {
                    console.log(data.length)
                },
                null,
                () => {
                    let id = this.stateService.session?.id!
                    this.databaseService.updateSessionState(id, GameState.Close)
                })
    }

    @HostListener('window:beforeunload')
    disconnectPlayer(): void {
        this.ngOnDestroy()
    }

    ngOnDestroy(): void {
        if (this.stateService.playerConnected) {
            this.removePlayerFromView(this.stateService.playerConnected)
        }
        this.setPlayerToInactive().then(() => this.checkGameState(this.stateService.session?.id!))
    }

    private setPlayerToInactive() {
        return this.databaseService.setPlayerInactive()
    }

    toggleCard(card: Card) {
       this.databaseService.updatePlayerCardValue(card)
    }

}
