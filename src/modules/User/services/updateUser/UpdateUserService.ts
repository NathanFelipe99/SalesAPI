import { IListUserResponseDTO } from "../../dtos/IListUserResponseDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { UserUtils } from "../../utils/UserUtils";

@injectable()
class UpdateUserService {
    constructor(
        @inject('UserRepository')
        private readonly _wRepository: IUserRepository,
        private readonly _wUserUtils: UserUtils
    ) { }

    async execute(id: string, { caUsuario, anEmail, caCPF, anTelefone }: IUpdateUserDTO): Promise<IListUserResponseDTO> {
        await this._wUserUtils.verifyFormats(anEmail, caCPF);
        await this._wUserUtils.verifyExistence(caUsuario, anEmail, caCPF);

        const wUser = await this._wRepository.update(id, {
            caUsuario,
            anEmail,
            caCPF,
            anTelefone
        });

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

export { UpdateUserService };