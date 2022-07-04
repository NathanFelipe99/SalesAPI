import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity('user')
class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    caUsuario!: string;

    @Column()
    cnUsuario!: number;

    @Column({ default: 0 })
    boAdmin!: number;

    @Column()
    anSenha?: string;

    @Column()
    anEmail!: string;

    @Column()
    caCPF!: string;

    @Column()
    anTelefone?: string;

    @Column({ default: 0 })
    boInativo?: number;

    @CreateDateColumn({ name: 'dtIncSys' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'dtAltSys' })
    updatedAt?: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.createdAt = new Date();
            this.boAdmin = 0;
        }
    }
}

export { User };
