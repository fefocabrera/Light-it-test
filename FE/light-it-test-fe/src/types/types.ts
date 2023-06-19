export interface Diagnosis {
    Issue: {
        ID: number,
        Name: string,
        Accuracy: number,
        Ranking: number
    };
    Specialisation: Specialist[]
}

export interface Specialist {
    ID: number,
    Name: string
}