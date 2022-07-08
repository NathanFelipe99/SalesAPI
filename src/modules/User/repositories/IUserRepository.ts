import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/model/User";

interface IUserRepository {
    create({ caUsuario, anSenha, anEmail, caCPF, anTelefone }: ICreateUserDTO): Promise<User>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(anEmail: string): Promise<User | undefined>;
    findByCPF(caCPF: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    update({ caUsuario, anEmail, caCPF, anTelefone }: IUpdateUserDTO): Promise<User>;
    delete(id: string): void;
    changePassword(id: string, anSenha: string): void;
    setAdmin(id: string): void;
}

export { IUserRepository };
