import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        ModalComponent
    ],
    exports: [
        ModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class SharedModule { }
