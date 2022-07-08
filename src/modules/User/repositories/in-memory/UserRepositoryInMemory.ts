import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IGenericSearchUserDTO } from "../../dtos/IGenericSearchUserDTO";
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

    async update({ caUsuario, anEmail, caCPF, anTelefone }: IUpdateUserDTO): Promise<User> {
        const wFindIndex = this.wUsers.findIndex(wUser => wUser.caUsuario === caUsuario);

        if (wFindIndex === -1) {
            throw new Error("User not found");
        } else {
            this.wUsers[wFindIndex].caUsuario = caUsuario;
            this.wUsers[wFindIndex].anEmail = anEmail;
            this.wUsers[wFindIndex].caCPF = caCPF;
            this.wUsers[wFindIndex].anTelefone = anTelefone;

            delete this.wUsers[wFindIndex].anSenha;
            
            return this.wUsers[wFindIndex];
        }
    }

    delete(id: string): void {
        const wFindIndex = this.wUsers.findIndex(wUser => wUser.id === id);

        this.wUsers[wFindIndex].boInativo = 1;

    }

    changePassword(id: string, anSenha: string): void {
        const wFindIndex = this.wUsers.findIndex(wUser => wUser.id === id);

        this.wUsers[wFindIndex].anSenha = anSenha;
    }

    setAdmin(id: string): void {
        const wFindIndex = this.wUsers.findIndex(wUser => wUser.id === id);

        this.wUsers[wFindIndex].boAdmin = 1;
    }

}

export { UserRepositoryInMemory };