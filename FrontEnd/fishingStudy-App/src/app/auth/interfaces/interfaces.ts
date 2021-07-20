
// interface de solicitud a reset-password
export interface ResetPasswordRequest {
    newPassword: string;
    token: string;
}
// interface de la respuesta de reset-password
export interface ResetPasswordResponse {
    ok: boolean;
    msg: string;
}