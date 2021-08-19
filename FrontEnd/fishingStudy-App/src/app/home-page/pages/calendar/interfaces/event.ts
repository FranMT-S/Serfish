export interface Evento {
    title        : string;
    description  : string;
    location     : string;
    start        : Date;
    end          : Date;
    _id          : string;
}

export interface ShowEvent{
    title: string;
    start: Date;
    end: Date;
}

export interface EventResponse{
    ok : boolean;
    events : Evento[];
}

export interface registerResponse{
    ok : boolean;
    events : Evento;
}