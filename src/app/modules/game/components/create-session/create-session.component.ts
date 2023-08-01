import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Session} from "../../models/session.model";
import {GameState} from "../../enums/game-state.enum";
import {DatabaseService} from "../../../core/services/database.service";
import {DocumentReference} from "@angular/fire/firestore";
import {VotingSystem} from "../../models/voting-system.model";
import {StateService} from "../../../core/services/state.service";


@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent implements OnInit{
  session!: DocumentReference;
  votingSystems : VotingSystem[] = [];
  constructor(private router: Router, private dbService: DatabaseService, public stateService : StateService) {
  }

  ngOnInit() {
      this.getVotingSystems();
      this.stateService.url = this.router.url
  }
  onSubmitForm(form: NgForm): Promise<boolean> {
    console.log(form.value)
    const session = new Session("1",form.value.sessionName, Date.now(), form.value.votingSystem, GameState.Created);
    return this.createSession(session).then(() => this.goToCreatedSession())
  }
  async createSession(session: Session): Promise<void> {
    await this.dbService.createSession(session).then(data => {
      console.log("session doc returned by service", data)
      this.session = data
    })

  }

  goToCreatedSession(): Promise<boolean> {
    return this.router.navigateByUrl(`/${this.session.id}`)
  }

  getVotingSystems() : void {
    this.dbService.getVotingSystems$().subscribe(value => {
        value.forEach(system => {
            let newSystem = new VotingSystem(system.id, system.name,system.cards)
            this.votingSystems.push(newSystem);

        })
    })
  }

}
