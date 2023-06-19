import { Uuid } from '../../types/Basetypes';
export class HistoryDiagnosisDto {
    userUuid: Uuid;
    evaluations: EvaluationDto[];

    constructor({
        userUuid,
        evaluations,
    }: {
        userUuid: Uuid,
        evaluations: EvaluationDto[],
    }) {
        this.userUuid = userUuid;
        this.evaluations = evaluations;
    }
}

export class EvaluationDto {
    uuid: Uuid;
    date: Date;
    symptoms: string;
    diagnoses: DiagnosisDto[];

    constructor({
        uuid,
        date,
        diagnoses,
        symptoms
    }: {
        uuid: Uuid,
        date: Date,
        diagnoses: DiagnosisDto[],
        symptoms: string
    }) {
        this.uuid = uuid;
        this.date = date;
        this.diagnoses = diagnoses;
        this.symptoms = symptoms;
    }
}

export class DiagnosisDto {
    uuid: Uuid;
    description: string;
    precision: number;
    confirmed: boolean;

    constructor({
        uuid,
        description,
        precision,
        confirmed
    }: {
        uuid: Uuid,
        description: string,
        precision: number,
        confirmed: boolean
    }) {
        this.uuid = uuid;
        this.description = description;
        this.precision = precision;
        this.confirmed = confirmed;
    }
}


