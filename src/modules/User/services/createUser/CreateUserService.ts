import { hashSync } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IListUserResponseDTO } from "../../dtos/IListUserResponseDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import validator from "validator";
import pkg from "gerador-validador-cpf";

const { validate } = pkg;

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepository')
        private readonly _wRepository: IUserRepository
    ) { }
    
    async execute({
        caUsuario, 
        anSenha, 
        anEmail, 
        caCPF, 
        anTelefone
    }: ICreateUserDTO): Promise<IListUserResponseDTO> {
        await this.verifyFormats(anEmail, caCPF);
        await this.verifyExistence(caUsuario, anEmail, caCPF);

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

    private async verifyFormats(anEmail: string, caCPF: string) {
        if (!validator.isEmail(anEmail)) throw new AppError('Email informado é inválido!');

        if(!validate(caCPF)) throw new AppError('CPF informado é inválido!');
    }

    private async verifyExistence(caUsuario: string, anEmail: string, caCPF: string) {
        const wVerifyCaUsuario = await this._wRepository.findByCaUsuario(caUsuario);
        const wVerifyEmail = await this._wRepository.findByEmail(anEmail);
        const wVerifyCPF = await this._wRepository.findByCPF(caCPF);

        if (wVerifyCaUsuario || wVerifyEmail || wVerifyCPF) {
            throw new AppError('Já existe um usuário com esse login, email ou CPF!');
        }
    }
}

export { CreateUserService };