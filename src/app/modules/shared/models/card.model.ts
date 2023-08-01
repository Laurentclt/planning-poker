export class Card {
  id : string;
  value : number;
  isHidden : boolean;

  constructor(id: string, value: number, isHidden: boolean) {
    this.id = id;
    this.value = value;
    this.isHidden = isHidden;
  }

}
