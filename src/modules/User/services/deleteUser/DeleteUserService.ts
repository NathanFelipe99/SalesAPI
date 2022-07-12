import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/error/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class DeleteUserService {
    constructor(
        @inject('UserRepository')
        private readonly _wRepository: IUserRepository
    ) { }

    async execute(id: string): Promise<void> {
        /* Pendente aplicação das validações */
        const wUserExists = await this._wRepository.findById(id);

        if (!wUserExists || wUserExists.boInativo == 1) throw new AppError('Este usuário está inativo!');
        
        this._wRepository.delete(id);
    }
}

export { DeleteUserService };