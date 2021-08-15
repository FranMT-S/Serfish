export interface BiologicalDataProcess {
    ok:          boolean;
    biologyData: BiologyDatum[];
}

export interface BiologyDatum {
    _id:   number;
    count: number;
}
