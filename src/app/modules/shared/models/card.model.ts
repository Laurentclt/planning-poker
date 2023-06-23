export class Card {
  private _id : string;
  private _value : number;
  private _isHidden : boolean;


  constructor(id: string, value: number, isHidden: boolean) {
    this._id = id;
    this._value = value;
    this._isHidden = isHidden;
  }


  get id(): string {
    return this._id;
  }

  get value(): number {
    return this._value;
  }

  get isHidden(): boolean {
    return this._isHidden;
  }

  set value(value: number) {
    this._value = value;
  }

  set isHidden(value: boolean) {
    this._isHidden = value;
  }

  set id(value: string) {
    this._id = value;
  }
}
