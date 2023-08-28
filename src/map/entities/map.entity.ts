

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ParentEntity } from 'src/user/shared/entities/parent.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('maps')
export class MapEntity extends ParentEntity {
    constructor(entity?: Partial<MapEntity>) {
        super()
        this.setArgumentToThisObject(entity)
    }
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'owner_id' })
    owner: UserEntity;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;
}
