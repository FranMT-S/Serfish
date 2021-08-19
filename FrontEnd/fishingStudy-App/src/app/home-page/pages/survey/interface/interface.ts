
export interface datoBiologico {
    nombreComun: string;
    nombreCientifico: string;
    familia: string;
    genero: string;
    especie: string;
    sexo: string;
    longitudHorquilla: string;
    pesoGr: string;
}

export interface SurveyRequest {
    comunidad: string;
    especies: datoBiologico[];
}

export interface SurveyResponse {
    ok    : boolean;
    msg?  : string;
}