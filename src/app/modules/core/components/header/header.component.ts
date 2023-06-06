import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoutesPathEnum} from "../../enums/routes-path.enum";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  currentPath$! :Observable<string>;
  constructor(private router : Router, private route : ActivatedRoute) {
  }
  ngOnInit() {
   this.route.params.subscribe( value => console.log(value));
  }

  isLandingPage() : boolean {
    console.log(this.currentPath$)
    return true;
  }
  goToHomePage() {
    this.router.navigateByUrl(RoutesPathEnum.Home);
  }

  goToCreateSessionPage() {
    this.router.navigateByUrl(RoutesPathEnum.CreateSession);
  }

}
