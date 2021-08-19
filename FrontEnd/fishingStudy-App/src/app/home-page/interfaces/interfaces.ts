export interface Usuario {
    name    : string;
    email   : string;
    role    : string;
    uid?    : string;
    index?  : number;
    state?  : Boolean;
    img?    : string;
    ok?: boolean;
}

export interface LoginResponse {
    ok    : boolean;
    msg?  : string;
    data? : Usuario;
    token?: string;
}

export interface AuthResponse {
    ok: boolean;
    msg?: string;
    data?: Usuario;
    token?: string;
}

// export interface UpdateData {
//     name: string;
//     email: string;
//     uid?: string;
//     role?: string;
//     google?: boolean;
//     state?: Boolean;
// }

// export interface UpdateDataResponse {
//     ok: boolean;
//     userUpdate: UpdateData
// }

export interface UpdatePassword {
    oldPassword: string;
    newPassword: string;
    uid?: string;
}

export interface UpdatePasswordResponse {
    ok: boolean;
    msg: string;
}

export interface refImage{
    url:string,
  }

export interface Documento {
    _id               : string;
    file             : string;
    name             : string;
    uploadDate       : string;
    ownerDocument    : string;
}

