import { hashSync } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/model/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import validator from "validator";
import pkg from "gerador-validador-cpf";

const { validate } = pkg;

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepository')
        private readonly _repository: IUserRepository
    ) { }
    
    async execute({
        caUsuario, 
        anSenha, 
        anEmail, 
        caCPF, 
        anTelefone
    }: ICreateUserDTO): Promise<User> {
        await this.verifyFormats(anEmail, caCPF);
        await this.verifyExistence(caUsuario, anEmail, caCPF);

        const wHash = hashSync(anSenha, 8);
        const wCPF = caCPF.replace(/[^\d]+/g, '');
        const wUser = await this._repository.create({
            caUsuario,
            anSenha: wHash,
            anEmail,
            caCPF,
            anTelefone
        });

        delete wUser.anSenha;

        return wUser;
    }

    private async verifyFormats(anEmail: string, caCPF: string) {
        if (!validator.isEmail(anEmail)) throw new AppError('Email informado é inválido!');

        if(!validate(caCPF)) throw new AppError('CPF informado é inválido!');
    }

    private async verifyExistence(caUsuario: string, anEmail: string, caCPF: string) {
        const wVerifyCaUsuario = await this._repository.findByCaUsuario(caUsuario);
        const wVerifyEmail = await this._repository.findByEmail(anEmail);
        const wVerifyCPF = await this._repository.findByCPF(caCPF);
        console.log('uuh', wVerifyCPF);
        if (wVerifyCaUsuario || wVerifyEmail || wVerifyCPF) {
            throw new AppError('Já existe um usuário com esse login, email ou CPF!');
        }
    }
}

export { CreateUserService };