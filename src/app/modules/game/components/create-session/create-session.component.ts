import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Session} from "../../models/session.model";
import {GameState} from "../../enums/game-state.enum";
import {DatabaseService} from "../../../core/services/database.service";
import {DocumentReference} from "@angular/fire/firestore";


@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent {
  session!: DocumentReference;

  constructor(private router: Router, private dbService: DatabaseService) {
  }

  async createSession(session: Session): Promise<void> {
    await this.dbService.createSession(session).then(data => {
      console.log("session doc returned by service", data)
      this.session = data
    })

  }

  goToSessionCreated(): Promise<boolean> {
    return this.router.navigateByUrl(`/${this.session.id}`)
  }

   onSubmitForm(form: NgForm): Promise<boolean> {
    console.log(form.value)
    const session = new Session(form.value.sessionName, Date.now(), form.value.votingSystem, [], GameState.Created);
     return this.createSession(session).then(() => this.goToSessionCreated())
  }
}
