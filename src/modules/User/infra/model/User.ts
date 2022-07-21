import pkg from "typeorm";
const { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } = pkg;
import { v4 as uuidV4 } from "uuid";

@Entity('user')
class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    caUsuario?: string;

    cnUsuario!: number;

    @Column()
    boAdmin!: number;

    @Column()
    anSenha?: string;

    @Column()
    anEmail?: string;

    @Column()
    caCPF?: string;

    @Column()
    anTelefone?: string;

    @Column()
    boInativo?: number;

    @CreateDateColumn({ name: 'dtIncSys' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'dtAltSys' })
    updatedAt!: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.createdAt = new Date();
            this.boInativo = 0;
            this.boAdmin = 0;
        }
    }
}

export { User };
