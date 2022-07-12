import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class DeleteUserService {
    constructor(
        @inject('UserRepository')
        private readonly _wRepository: IUserRepository
    ) { }

    async execute(id: string): Promise<void> {
        /* Pendente aplicação das validações */
        this._wRepository.delete(id);
    }
}

export { DeleteUserService };