export class Card {
  id : number;
  value : number;
  ishidden : boolean;


  constructor(id: number, value: number, ishidden: boolean) {
    this.id = id;
    this.value = value;
    this.ishidden = ishidden;
  }


}
