import { IListUserResponseDTO } from "../../dtos/IListUserResponseDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import { UserUtils } from "../../utils/UserUtils";
import { AppError } from "../../../../shared/error/AppError";

@injectable()
class UpdateUserService {
    constructor(
        @inject('UserRepository')
        private readonly _wRepository: IUserRepository,
        private readonly _wUserUtils: UserUtils
    ) { }

    async execute(id: string, { caUsuario, anEmail, caCPF, anTelefone }: IUpdateUserDTO): Promise<IListUserResponseDTO> {
        const wUserExists = await this._wRepository.findById(id);

        if (!wUserExists || wUserExists.boInativo == 1) throw new AppError('Este usuário está inativo!'); 

        await this._wUserUtils.verifyFormats(anEmail, caCPF);
        await this._wUserUtils.verifyExistences(caUsuario, anEmail, caCPF, id);

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