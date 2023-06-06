import {Player} from "../../players/models/player.model";
import {Card} from "./card.model";

export class Vote {
  id : number;
  player : Player;
  card : Card;
}
