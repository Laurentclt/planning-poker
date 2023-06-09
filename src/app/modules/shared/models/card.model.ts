export class Card {
  id : number;
  value : number;
  isHidden : boolean;


  constructor(id: number, value: number, isHidden: boolean) {
    this.id = id;
    this.value = value;
    this.isHidden = isHidden;
  }


}
