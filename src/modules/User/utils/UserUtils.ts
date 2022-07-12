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

    async verifyExistences(caUsuario: string, anEmail: string, caCPF: string, id?: string) {
        const wVerifyCaUsuario = await this._wRepository.findByCaUsuario(caUsuario);
        const wVerifyEmail = await this._wRepository.findByEmail(anEmail);
        const wVerifyCPF = await this._wRepository.findByCPF(caCPF);

        if (id) {
            const wUserExists = await this._wRepository.findById(id);

            if (!wUserExists) throw new AppError('Usuário não encontrado!');

            if (wVerifyCaUsuario && (caUsuario != wUserExists.caUsuario)) throw new AppError('Usuário com este Login já existe!');
            if (wVerifyEmail && (anEmail != wUserExists.anEmail)) throw new AppError('Usuário com este Email já existe!');
            if (wVerifyCPF && (caCPF != wUserExists.caCPF)) throw new AppError('Usuário com este CPF já existe!');

            return;
        } else {
            if (wVerifyCaUsuario || wVerifyEmail || wVerifyCPF) {
                throw new AppError('Usuário com este Login, Email ou CPF já existe!');
            }
        }
    }
}

export { UserUtils };