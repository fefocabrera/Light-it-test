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

export interface DiagnosesHistory {
    userUuid: string,
    evaluations: EvaluationHistory[]
}

export interface EvaluationHistory {
    uuid: string,
    date: Date,
    symptoms: string,
    diagnoses: DiagnosisHistory[]
}

export interface DiagnosisHistory {
    uuid: string,
    description: string,
    precision: number,
    confirmed: boolean
}