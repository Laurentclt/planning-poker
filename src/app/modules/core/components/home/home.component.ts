import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RoutesPathEnum} from "../../enums/routes-path.enum";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  constructor(private router : Router) {
  }

  goToCreateSession() {
    this.router.navigateByUrl(RoutesPathEnum.CreateSession)
  }
}
