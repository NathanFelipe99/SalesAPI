import { inject, injectable } from "tsyringe";
import { IListUserResponseDTO } from "../../dtos/IListUserResponseDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class ListAllUsersService {
    constructor(
        @inject('UserRepository')
        private readonly _wRepository: IUserRepository
    ) { }

    async execute(): Promise<IListUserResponseDTO[]> {
        const wUsers = await this._wRepository.findAll();
        
        return wUsers.map(wUser => ({
            id: wUser.id,
            cnUsuario: wUser.cnUsuario,
            caUsuario: wUser.caUsuario,
            anEmail: wUser.anEmail,
            caCPF: wUser.caCPF,
            anTelefone: wUser.anTelefone,
            boInativo: wUser.boInativo,
            boAdmin: wUser.boAdmin,
            createdAt: wUser.createdAt,
        }));
    }
}

export { ListAllUsersService };