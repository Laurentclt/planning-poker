import { Component, DoCheck} from '@angular/core';
import { Router} from "@angular/router";
import {RoutesPathEnum} from "../../enums/routes-path.enum";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck{
  currentPath! : string;
  constructor(private router : Router) {
  }
  ngDoCheck() {
    this.currentPath = this.router.url;
    console.log("do check :", this.currentPath)
  }

  goToHomePage() : Promise<boolean> {
     return this.router.navigateByUrl(RoutesPathEnum.Home);
  }

  goToCreateSessionPage() : Promise<boolean> {
    return this.router.navigateByUrl(RoutesPathEnum.CreateSession);
  }

  protected readonly RoutesPathEnum = RoutesPathEnum;
}
