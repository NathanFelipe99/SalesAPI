import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/AppError";
import { IListUserResponseDTO } from "../../dtos/IListUserResponseDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class ListUserByIdService {
    constructor(
        @inject('UserRepository')
        private readonly _wRepository: IUserRepository
    ) { }

    async execute(id: string): Promise<IListUserResponseDTO> {
        const wUser = await this._wRepository.findById(id);

        if (!wUser) throw new AppError('Usuário não encontrado!');

        return {
            id: wUser.id,
            cnUsuario: wUser.cnUsuario,
            caUsuario: wUser.caUsuario,
            anEmail: wUser.anEmail,
            caCPF: wUser.caCPF,
            anTelefone: wUser.anTelefone,
            boInativo: wUser.boInativo,
            boAdmin: wUser.boAdmin,
            createdAt: wUser.createdAt
        };
    }
}

export { ListUserByIdService };