export class SymptomDto {
    ID: number;
    Name: string;

    constructor({
        ID,
        Name,
    }: {
        ID: number,
        Name: string,
    }) {
        this.ID = ID;
        this.Name = Name;
    }
}