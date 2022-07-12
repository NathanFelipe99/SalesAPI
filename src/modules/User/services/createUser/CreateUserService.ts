import { hashSync } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IListUserResponseDTO } from "../../dtos/IListUserResponseDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserUtils } from "../../utils/UserUtils";

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepository')
        private readonly _wRepository: IUserRepository,
        private readonly _wUserUtils: UserUtils
    ) { }
    
    async execute({
        caUsuario, 
        anSenha, 
        anEmail, 
        caCPF, 
        anTelefone
    }: ICreateUserDTO): Promise<IListUserResponseDTO> {
        await this._wUserUtils.verifyFormats(anEmail, caCPF);
        await this._wUserUtils.verifyExistences(caUsuario, anEmail, caCPF);

        const wHash = hashSync(anSenha, 8);

        const wUser = await this._wRepository.create({
            caUsuario,
            anSenha: wHash,
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

export { CreateUserService };