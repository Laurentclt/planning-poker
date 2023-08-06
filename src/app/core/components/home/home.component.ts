import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {RoutesPathEnum} from "../../enums/routes-path.enum";
import {StateService} from "../../services/state.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{


    constructor(private router: Router, private stateService : StateService) {
    }

    ngOnInit() {
    }
    goToCreateSession() {
        this.router.navigateByUrl(RoutesPathEnum.CreateSession)
    }
}
