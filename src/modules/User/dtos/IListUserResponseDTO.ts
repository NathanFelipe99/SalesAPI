interface IListUserResponseDTO {
    id?: string;
    cnUsuario: number;
    caUsuario?: string;
    anEmail?: string;
    caCPF?: string;
    anTelefone?: string;
    boInativo?: number;
    boAdmin: number;
    createdAt?: Date;
}

export { IListUserResponseDTO };