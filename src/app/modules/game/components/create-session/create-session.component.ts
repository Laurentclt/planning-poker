import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Session} from "../../models/session.model";
import {GameState} from "../../enums/game-state.enum";
import {DatabaseService} from "../../../../core/services/database.service";
import {VotingSystem} from "../../models/voting-system.model";
import {StateService} from "../../../../core/services/state.service";


@Component({
    selector: 'app-create-session',
    templateUrl: './create-session.component.html',
    styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent implements OnInit {
    votingSystems: VotingSystem[] = [];
    defaultSelectedSystem!: VotingSystem;

    constructor(private router: Router, private dbService: DatabaseService, public stateService: StateService) {
    }

    ngOnInit() {
        this.getVotingSystems();
        this.stateService.url = this.router.url
    }

    onSubmitForm(form: NgForm): void {
        console.log("form values :", form.value)
        const session = new Session(form.value.sessionName, {...form.value.votingSystem}, GameState.Created);
        this.createSession(session).then(
            () => this.goToCreatedSession()
        )
    }

    // create session in database and add session to state manager
    private async createSession(session: Session): Promise<void> {
        // create session in database
        await this.dbService.createSession(session)
            .then(data => {
                console.log('session created with success, id = ', data.id)

                // convert data to object
                let newSession = new Session(session.name, session.votingSystem, session.state)
                newSession.id = data.id

                // add session to state manager
                this.stateService.session = newSession
            })
            .catch(err => console.log(err))
    }

    goToCreatedSession(): Promise<boolean> {
        return this.router.navigateByUrl(`/${this.stateService.session!.id}`)
    }

    getVotingSystems(): void {
        this.votingSystems = this.dbService.getVotingSystems()
    }
}
