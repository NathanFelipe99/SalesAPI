import validator from "validator";
import { AppError } from "../../../shared/error/AppError";
import pkg from "gerador-validador-cpf";
import { IUserRepository } from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

const { validate } = pkg;

@injectable()
class UserUtils {

    constructor(
        @inject('UserRepository')
        private readonly _wRepository: IUserRepository
    ) { }

    async verifyFormats(anEmail: string, caCPF: string): Promise<void> {
        if (!validator.isEmail(anEmail)) throw new AppError('Email informado é inválido!');

        if (!validate(caCPF)) throw new AppError('CPF informado é inválido!');
    }

    async verifyExistence(caUsuario: string, anEmail: string, caCPF: string) {
        const wVerifyCaUsuario = await this._wRepository.findByCaUsuario(caUsuario);
        const wVerifyEmail = await this._wRepository.findByEmail(anEmail);
        const wVerifyCPF = await this._wRepository.findByCPF(caCPF);

        if (wVerifyCaUsuario || wVerifyEmail || wVerifyCPF) {
            throw new AppError('Já existe um usuário com esse login, email ou CPF!');
        }
    }
}

export { UserUtils };