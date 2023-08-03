import {Component, DoCheck} from '@angular/core';
import {Router} from "@angular/router";
import {RoutesPathEnum} from "../../enums/routes-path.enum";
import {StateService} from "../../services/state.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(private router: Router, public stateService : StateService) {
    }

    goToHomePage(): Promise<boolean> {
        return this.router.navigateByUrl(RoutesPathEnum.Home);
    }

    goToCreateSessionPage(): Promise<boolean> {
        return this.router.navigateByUrl(RoutesPathEnum.CreateSession);
    }
}
