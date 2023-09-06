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

    constructor(private router: Router, private dbService: DatabaseService) {
    }

    ngOnInit() {
        this.getVotingSystems$();
    }

    onSubmitForm(form: NgForm): void {
        console.log("form values :", form.value)
        if (form.valid) {
            const session = new Session(form.value.sessionName, {...form.value.votingSystem}, GameState.Open);
            this.dbService.createSession(session).then(id => this.goToCreatedSession(id))
        }
    }

    goToCreatedSession(id : string): Promise<boolean> {
        return this.router.navigateByUrl(`/${id}`)
    }

    getVotingSystems$(): void {
        this.dbService.getVotingSystems$().subscribe(values => values.forEach(value => {
            this.votingSystems.push(new VotingSystem(value.name, value.values))
            this.defaultSelectedSystem = this.votingSystems.filter(value => value.name === "classic")[0]
        }))
    }
}
