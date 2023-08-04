import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Modal} from "../../models/modal.model";
import {Form, NgForm} from "@angular/forms";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() modal!: Modal;
    @Output() modalEvent = new EventEmitter();








    onSubmitForm(form : NgForm) {
        console.log(form.value)
        this.modalEvent.emit(form.value)
    }
}
