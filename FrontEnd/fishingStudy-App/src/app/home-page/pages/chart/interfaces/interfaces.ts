//############  Utilizadas en el componente chart/biological-data  //###########
export interface Background {
    background: string;
    hoverBackground: string;
}

export interface dataFrom1BarChart {
    data: number[];
    label: string;
}

export interface DateAndIndex {
    fecha: string;
    index: number;
}
//################################################

//############  ForkLengthAndIndividual  //###########
export interface ResponseForkLengthAndIndividual {
    ok: boolean;
    forkLengthAndIndividuals: ForkLengthAndIndividual[];
}

export interface ForkLengthAndIndividual {
    length: number;
    currentTotal: number;
}
//################################################


//############  CommonScientificName  //##########
export interface ResponseCommonScientificName {
    ok: boolean;
    fishNames: FishName[];
}

export interface FishName {
    commonName: string;
    scientificName: string;
}
//##############################################


//############  LabelYearMonth  //############
export interface ResponseLabelYearMonth {
    ok: boolean;
    labelDate: LabelDate[];
}

export interface LabelDate {
    year: number;
    month: number;
}
//##############################################


//############  DataActivityMonth  //############
export interface ResponseDataActivityMonth {
    ok: boolean;
    dataActivityMonth: DataActivityMonth[];
}

export interface DataActivityMonth {
    year: number;
    month: number;
    nombreComun: string;
    nombreCientifico: string;
    cantidad: number;
}
// ###############################################