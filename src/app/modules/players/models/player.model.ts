export class Player {
  id : number;
  pseudo : string;
  card : Card;


  constructor(id: number, pseudo: string, card: Card) {
    this.id = id;
    this.pseudo = pseudo;
    this.card = card;
  }
}
