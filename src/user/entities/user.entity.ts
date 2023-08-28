import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { ParentEntity } from '../shared/entities/parent.entity';
import { hash } from 'bcrypt';

@Entity('users')
export class UserEntity extends ParentEntity {
    constructor(entity?: Partial<UserEntity>) {
        super()
        this.setArgumentToThisObject(entity)
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await hash(this.password, process.env.SALT_HASH)
        }
    }
}
