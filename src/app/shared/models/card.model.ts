export class Card  {
    value : number | null;
    isHidden : boolean;

    constructor(value : number | null = null , isHidden : boolean = false) {
        this.value = value
        this.isHidden = isHidden
    }
}
