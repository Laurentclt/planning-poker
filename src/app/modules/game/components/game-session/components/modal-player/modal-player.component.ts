import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-modal-player',
  templateUrl: './modal-player.component.html',
  styleUrls: ['./modal-player.component.scss']
})
export class ModalPlayerComponent {

    @Output() modalEvent = new EventEmitter();


    onSubmitForm(form : NgForm) {
        console.log(form.value)
        if (form.valid) {
            this.modalEvent.emit(form.value)
        }
    }

}
