import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./modules/core/components/home/home.component";
import {CreateSessionComponent} from "./modules/game/components/create-session/create-session.component";
import {GameSessionComponent} from "./modules/game/components/game-session/game-session.component";
import {RecordListComponent} from "./modules/records/components/record-list/record-list.component";
import {RecordDetailComponent} from "./modules/records/components/record-detail/record-detail.component";


const routes: Routes = [
  {path : "", pathMatch: "full",  redirectTo : "home"},
  {path : "home", component : HomeComponent},
  {path : "create-session", component : CreateSessionComponent},
  {path : "records", component : RecordListComponent},
  {path : "records/:id", component : RecordDetailComponent},
  {path : ":id", component : GameSessionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
