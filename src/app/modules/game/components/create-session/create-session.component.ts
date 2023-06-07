import {Component} from '@angular/core';
import { Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent {
    constructor(private router : Router) {
    }

    createSession() : void {
      //TODO : treatments in db
    }

    goToSessionCreated() : Promise<boolean> {
        return this.router.navigateByUrl("/hello")
    }
    onSubmitForm(form : NgForm) : Promise<boolean> {
      console.log(form.value)
      this.createSession();
      return this.goToSessionCreated();
    }
}
