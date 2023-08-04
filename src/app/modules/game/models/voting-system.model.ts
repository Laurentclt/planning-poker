import {Card} from "../../../shared/models/card.model";


export class VotingSystem {
    name: string;
    values: number[];

    constructor(name: string, values: number[]) {
        this.name = name;
        this.values = values;
    }

    getFullName(): string {
        let name: string = "";
        name += this.name
        name += "( "
        this.values.forEach(value => name += value + ", ")
        name += " )"
        return name;
    }


}
