import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Session} from "../../models/session.model";
import {GameState} from "../../enums/game-state.enum";
import {DatabaseService} from "../../../core/services/database.service";
import {DocumentReference} from "@angular/fire/firestore";
import {VotingSystem} from "../../models/voting-system.model";
import {Observable} from "rxjs";


@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent implements OnInit{
  session!: DocumentReference;
  votingSystems$! : Observable<VotingSystem[]>;
  constructor(private router: Router, private dbService: DatabaseService) {
  }

  ngOnInit() {
    this.votingSystems$ = this.getVotingSystems$();
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

  getVotingSystems$() : Observable<VotingSystem[]> {
    return this.dbService.getVotingSystems$()
  }

}
