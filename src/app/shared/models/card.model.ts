
export class Card  {
   value? : number;
   isHidden : boolean;

  constructor(value? : number , isHidden : boolean = false) {
      this.value = value
      this.isHidden = isHidden
  }
}

