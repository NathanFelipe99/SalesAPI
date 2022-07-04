import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../infra/model/User";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
    wUsers: User[] = [];

    async create({ caUsuario, anSenha, anEmail, caCPF, anTelefone }: ICreateUserDTO): Promise<User> {
        const wUser = new User();

        Object.assign(wUser, {
            caUsuario,
            anSenha,
            anEmail,
            caCPF,
            anTelefone
        });

        this.wUsers.push(wUser);

        delete wUser.anSenha;

        return wUser;
    }

    async findById(id: string): Promise<User | undefined> {
        const wUser = this.wUsers.find(wUser => wUser.id === id);

        wUser && delete wUser.anSenha;

        return wUser;
    }

    async findByEmail(anEmail: string): Promise<User | undefined> {
        const wUser = this.wUsers.find(wUser => wUser.anEmail === anEmail);

        wUser && delete wUser.anSenha;

        return wUser;
    }

    async findByCPF(caCPF: string): Promise<User | undefined> {
        const wUser = this.wUsers.find(wUser => wUser.caCPF === caCPF);

        wUser && delete wUser.anSenha;

        return wUser;
    }

    async findAll(): Promise<User[]> {
        return this.wUsers;
    }

    async find(field: string, value: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }

    update({ caUsuario, anEmail, caCPF, anTelefone }: IUpdateUserDTO): Promise<User> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    changePassword(id: string, anSenha: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    setAdmin(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export { UserRepositoryInMemory };