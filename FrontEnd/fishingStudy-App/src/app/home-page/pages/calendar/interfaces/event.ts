export interface Evento {
    _id         : string;
    name       : string;
    description: string;
    location   : string;
    startDate  : Date;
    endDate   : Date;
}

export interface ShowEvent{
    title : string;
    start : Date;
    end   : Date;
}